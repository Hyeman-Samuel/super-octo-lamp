import {createTransport, Transporter} from "nodemailer"
import { HttpError } from "../../../utility/error/http_error";
import { ResponseCode } from "../../../utility/response/response";


export class MailService {

    private transporter:Transporter
    constructor() {
        this.transporter = createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.NO_REPLY_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
            });
    }

    public async sendMail (recepientEmail:string,subject:string,message:string){
        let mailOptions = {
            from:`Filtar Africa <${process.env.NO_REPLY_EMAIL}>` ,
            to: recepientEmail,
            subject: subject,
            html: message
            };
            var promise = new Promise((resolve, reject)=> {
            this.transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                reject(new HttpError(error.message,ResponseCode.INTERNAL_SERVER_ERROR));   
            }
            resolve(response)
                });
            })
            return await promise
    }

}