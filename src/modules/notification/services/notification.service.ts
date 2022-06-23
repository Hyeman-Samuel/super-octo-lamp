import { OrderEntity } from "../../order/entities/order.entity";
import { MailService } from "../mailing/mailing.service";



export class NotificationService {

    private mailService:MailService
    constructor() {
        this.mailService = new MailService();
        
    }

    public async sendOrderConfirmation(order:OrderEntity){
        const subject = `New Order`;
            const message =`<p>Hello ${order.firstname} ${order.lastname},</p><p>Thank you for your order. Your order has been received and we will begin processing as soon as payment has been confirmed</p>`;
            await this.mailService.sendMailWithMailJet(order.email,subject,message)
        
    }

    public async sendOrderFullfilledAlert(order:OrderEntity){
        const subject = `Order Confirmation`;
            const message =`Thank you for buying into the xperience your order will begin processing immediately`;
            await this.mailService.sendMailWithMailJet(order.email,subject,message)
    }

    public async sendPaymentRedirectLink(order:OrderEntity,paymentLink:string){
        const subject = `Pending Payment`;
        const message =`<p>Oops ${order.firstname},</p><p>Looks like you haven't paid for the xperience yet. Your order ${order.orderRefrence} has been received and can only begin processing as soon as payment has been confirmed. The link to fulfill your payment is below </p> <p> <a href="${paymentLink}">Click here to proceed to checkout</a></p>`;
        await this.mailService.sendMailWithMailJet(order.email,subject,message)
    }

}