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
            await this.mailService.sendMail(order.email,subject,message)
        
    }

    public async sendOrderFullfilledAlert(order:OrderEntity){
        const subject = `Order Confirmation`;
            const message =`paid`;
            await this.mailService.sendMail(order.email,subject,message)
    }

}