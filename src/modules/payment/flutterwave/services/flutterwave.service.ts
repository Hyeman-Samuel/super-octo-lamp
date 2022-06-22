import axios, { AxiosRequestConfig} from 'axios';
import { HttpError } from "../../../../utility/error/http_error";
import { ResponseCode } from "../../../../utility/response/response";
import { OrderEntity } from '../../../order/entities/order.entity';
import { FlutterwaveTransferResponseBody, FlutterwaveVerificationResponseData, FlutterwaveWebhookData } from '../dtos/flutterwave.dto';

export class FlutterwaveService {

    public initiateStandardPayment = async (order:OrderEntity,redirectUrl:string):Promise<FlutterwaveTransferResponseBody> => {  
        const config ={
            headers:{
                Authorization:`Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                "Content-Type": 'application/json',
                'cache-control': 'no-cache'
            }
        } as AxiosRequestConfig

        const data = this.generateRequestBody(order,redirectUrl)
        try {
            const response =  await axios.post('https://api.flutterwave.com/v3/payments',data,config);
            const responseBody = response.data

            if (responseBody.status != "success") {
                throw new HttpError("Payment Failed",ResponseCode.INTERNAL_SERVER_ERROR)
                }

                const checkoutData =  new FlutterwaveTransferResponseBody()
                checkoutData.status = responseBody.status
                checkoutData.message = responseBody.message
                checkoutData.checkoutLink = responseBody.data.link
                return checkoutData;

        } catch (error:any) {
            throw new HttpError("Error from Flutterwave :"+ error.response.data.message,ResponseCode.INTERNAL_SERVER_ERROR);
        }
    } 

    public initiateInlinePayment = (order:OrderEntity,redirectUrl:string):object=>{
        const data = this.generateRequestBody(order,redirectUrl);
        return data;
    }

    public verifyPayment = async(transactionId:string):Promise<FlutterwaveVerificationResponseData>=>{

        const config ={
            headers:{
                Authorization:`Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                "Content-Type": 'application/json'
            }
        } as AxiosRequestConfig
        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,config)

        const responseBody = response.data as FlutterwaveVerificationResponseData

        return responseBody;

    }

    private generateRequestBody = (order:OrderEntity,redirectUrl:string):object=>{
        const body  ={
            "public_key":process.env.FLUTTERWAVE_PUBLIC_KEY,
            "tx_ref":order.id,
            "amount":order.price,
            "currency":"NGN",
            "redirect_url":redirectUrl,
            "payment_options":"card",
            "meta":{
                "order_number":order.orderRefrence
            },
            "customer":{
                "email":order.email,
                "phone_number":order.phoneNumber,
                "name" :`${order.firstname} ${order.lastname}`
            }
            ,
            "customizations":{
                "title":"Filtar",
                "description":"Augumented Reality"
                ,"logo":"https://res.cloudinary.com/filtarhq/image/upload/v1649246183/brand/favicon_ix1kqf.png"
            }
        }
        return body;
    }

    

}