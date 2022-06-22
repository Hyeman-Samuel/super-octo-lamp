import { Request, Router,Response } from "express";
import { UserEntity } from "../modules/auth/entities/user.entity";
import { UserService } from "../modules/auth/services/user.service";
import { CategoryEntity } from "../modules/category/entities/category.entity";
import { CategoryService } from "../modules/category/services/category.service";
import { NotificationService } from "../modules/notification/services/notification.service";
import { OrderStage } from "../modules/order/constants/order.constant";
import { CreateOrderRequestBody, FullfillOrderRequestBody } from "../modules/order/dtos/order.dto";
import { OrderEntity } from "../modules/order/entities/order.entity";
import { OrderService } from "../modules/order/services/order.service";
import { PackageEntity } from "../modules/package/entities/package.entity";
import { PackageService } from "../modules/package/services/package.service";
import { FlutterwaveWebhookData } from "../modules/payment/flutterwave/dtos/flutterwave.dto";
import { FlutterwaveService } from "../modules/payment/flutterwave/services/flutterwave.service";
import { HttpError } from "../utility/error/http_error";
import { validationMiddleware } from "../utility/middleware/validation.middleware";
import { respond, ResponseCode} from "../utility/response/response";

export class OrderController {
    public router: Router;
    private packageService:PackageService;
    private categoryService:CategoryService;
    private orderService:OrderService;
    private flutterwaveService:FlutterwaveService;
    private userService:UserService;
    private notificationService:NotificationService;

    constructor() {
    this.packageService = new PackageService();
    this.categoryService = new CategoryService();
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
        const [category,_package]= await Promise.all([
        await this.categoryService.getById(requestBody.categoryId),
        await this.packageService.getById(requestBody.packageId)
        ])
        if(!_package){
            throw new HttpError("package does not exist",ResponseCode.BAD_REQUEST);
        }
        if(!category){
            throw new HttpError("category does not exist",ResponseCode.BAD_REQUEST);
        }
        const order = {
            firstname: user ? user.firstname : firstname,
            lastname: user ? user.lastname : lastname,
            phoneNumber: user ? user.phoneNumber : phonenumber,
            email: user ? user.email : email,
            category: category as CategoryEntity,
            package: _package as PackageEntity,
            designImages:JSON.parse(JSON.stringify(designs)),
            hashtags:JSON.parse(JSON.stringify(hashtags)),
            orderRefrence:this.orderService.generateOrderRefrence(),
            price:await this.orderService.calculatePrice(requestBody.packageId,requestBody.platformIds)
        } as OrderEntity

        

        await this.orderService.saveOrderAndOrderDetails(order,requestBody.platformIds);
        await this.notificationService.sendOrderConfirmation(order);
        respond(res,order);
    }

    private flutterwaveWebhook = async(req:Request,res:Response)=>{
        const webHookData =  req.query as unknown as FlutterwaveWebhookData;
        if(webHookData.status != 'successful'){
            const order = await this.orderService.getById(webHookData.tx_ref);
            order.stage = OrderStage.PAYMENT_FAILED;
            await this.orderService.update(order);
            respond(res,"Order Failed");
        }else{            
            let paymentVerification = await this.flutterwaveService.verifyPayment(webHookData.transaction_id); 
            if(paymentVerification.status == "successful"){
                const orderId = webHookData.tx_ref;
                const order = await this.orderService.getById(orderId);
                order.paymentRefrence = paymentVerification.flw_ref;
                order.paidOn = paymentVerification.created_at;

                //startProcessingOrder also updates the order
                await this.orderService.startProcessingOrder(order);
                await this.notificationService.sendOrderFullfilledAlert(order);
                respond(res,"Payment Fulfilled");   
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