import { Request, Router,Response } from "express";
import { UserEntity } from "../../auth/entities/user.entity";
import { UserService } from "../../auth/services/user.service";
import { NotificationService } from "../../notification/services/notification.service";
import { OrderEntity,
        OrderService,
        OrderStage,
        CreateOrderRequestBody,
        CreateOrderResponseBody,
        FullfillOrderRequestBody,
        OrderPaymentVerificationBody} from "..";
import { FlutterwaveWebhookData } from "../../payment/flutterwave/dtos/flutterwave.dto";
import { FlutterwaveService } from "../../payment/flutterwave/services/flutterwave.service";
import { HttpError } from "../../../utility/error/http_error";
import { validationMiddleware } from "../../../utility/middleware/validation.middleware";
import { respond, ResponseCode} from "../../../utility/response/response";

export class OrderController {
    public router: Router;
    private orderService:OrderService;
    private flutterwaveService:FlutterwaveService;
    private userService:UserService;
    private notificationService:NotificationService;

    constructor() {
    this.orderService = new OrderService();
    this.flutterwaveService = new FlutterwaveService();
    this.userService = new UserService();
    this.notificationService = new NotificationService();

    this.router = Router();
    this.routes();
    }


    private getOrders = async(req:Request,res:Response)=>{

    }

    private createOrder = async(req:Request,res:Response)=>{
        const requestBody = res.locals.input as CreateOrderRequestBody
        const user = res.locals.user as UserEntity;
        const {firstname,lastname,email,phonenumber} = requestBody;
        if(!(firstname && lastname) && !user ){
            throw new HttpError("full name is required or login before using",ResponseCode.BAD_REQUEST)
        }
        if((!phonenumber) && !user ){
            throw new HttpError("phone number is required or login before using",ResponseCode.BAD_REQUEST)
        }
        if((!email) && !user ){
            throw new HttpError("email is required or login before using",ResponseCode.BAD_REQUEST)
        }
        const designs:string[] = [requestBody.designImage]
        const hashtags:string[] = [requestBody.hashtag]
        const order = {
            firstname: user ? user.firstname : firstname,
            lastname: user ? user.lastname : lastname,
            phoneNumber: user ? user.phoneNumber : phonenumber,
            email: user ? user.email : email,
            categoryId:requestBody.categoryId,
            packageId:requestBody.packageId,
            designImages:JSON.parse(JSON.stringify(designs)),
            hashtags:JSON.parse(JSON.stringify(hashtags)),
            orderRefrence:this.orderService.generateOrderRefrence(),
        } as OrderEntity
        
        await this.orderService.saveOrderAndOneOrderDetail(order,requestBody.platformIds[0]);
        const paymentRequest = this.flutterwaveService.initiateInlinePayment(order,requestBody.redirectUrl);
        await this.notificationService.sendOrderConfirmation(order);
        respond(res,new CreateOrderResponseBody(order,paymentRequest));
    }
    

    private flutterwaveWebhook = async(req:Request,res:Response)=>{
        const webHookData =  req.body.data as FlutterwaveWebhookData;
        const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
        const signature = req.headers["verif-hash"];
        if (!signature || (signature !== secretHash)) {
            throw new HttpError("Not from flutterwave",ResponseCode.UNAUTHORIZED);
        }
        if(webHookData.status != 'successful'){
            const order = await this.orderService.getById(webHookData.tx_ref);
            if(order.stage == OrderStage.PAYMENT_FAILED){
                respond(res,{},"Payment already failed")
            }
            order.stage = OrderStage.PAYMENT_FAILED;
            await this.orderService.update(order);
            //const flwStandardPaymentBody = await this.flutterwaveService.initiateStandardPayment(order,"https://www.filtar.africa")
            //await this.notificationService.sendPaymentRedirectLink(order,flwStandardPaymentBody.checkoutLink);
            respond(res,{},"Order Failed");
        }else{        

            let paymentVerification = await this.flutterwaveService.verifyPayment(webHookData.id); 
            if(paymentVerification.status == "success"){
                const orderId = webHookData.tx_ref;
                const order = await this.orderService.getById(orderId);
                if(order.stage != OrderStage.PENDING_PAYMENT){
                respond(res,{},"Payment not needed");
                return;
                }
                order.paymentRefrence = paymentVerification.flw_ref;
                order.paidOn = new Date();

                //startProcessingOrder also updates the order
                await this.orderService.startProcessingOrder(order);
                await this.notificationService.sendOrderFullfilledAlert(order);
                respond(res,{},"Payment Fulfilled");   
                return;
            }             
        }
        throw new HttpError("Waiting for confirmation",ResponseCode.NOT_FOUND);
        
    }


    private fuilfillOrder = async(req:Request,res:Response)=>{
        const requestBody = res.locals.input as FullfillOrderRequestBody
        const order = await this.orderService.getOrder({orderRefrence:requestBody.orderReference})

        if(!order || order.stage != OrderStage.PENDING_PAYMENT ){
            throw new HttpError("Payment not expected",ResponseCode.CONFLICT)
        }
        const paymentRequest = await this.flutterwaveService.initiateInlinePayment(order,requestBody.redirectUrl);

        respond(res,paymentRequest)
    }

    private verifyOrderPayment = async(req:Request,res:Response)=>{
        const requestBody = res.locals.input as OrderPaymentVerificationBody;
        const order = await this.orderService.getOrder({orderRefrence:requestBody.orderReference})

        if(!order ){
            throw new HttpError("Order does not exist",ResponseCode.CONFLICT)
        }

        let paymentVerification = await this.flutterwaveService.verifyPaymentByTx_ref(order.id); 
        if(paymentVerification.status == "success"){
            if(order.stage != OrderStage.PAYMENT_FAILED && order.stage != OrderStage.PENDING_PAYMENT ){
            respond(res,{},"Payment not needed");
            return;
            }
            order.paymentRefrence = paymentVerification.flw_ref;
            order.paidOn = new Date(paymentVerification.created_at);

            //startProcessingOrder also updates the order
            await this.orderService.startProcessingOrder(order);
            await this.notificationService.sendOrderFullfilledAlert(order);
            respond(res,{},"Payment Fulfilled");   
        }else{
            throw new HttpError("Payment not made",ResponseCode.BAD_REQUEST)
        }

    }


    private routes(){
        this.router.get("/",)
        this.router.get("/:orderReference",)
        this.router.post("/",validationMiddleware(CreateOrderRequestBody),this.createOrder)
        this.router.post("/payment/flutterwave",validationMiddleware(FullfillOrderRequestBody),this.fuilfillOrder)
        this.router.post("/flutterwave/redirect",this.flutterwaveWebhook)
        this.router.put("/:orderId/upload/platform/:platformId")
        this.router.put("/:orderId/submit")
        this.router.put("/:orderId/sendback")
        this.router.put("/:orderId/deliever")
    }
}  