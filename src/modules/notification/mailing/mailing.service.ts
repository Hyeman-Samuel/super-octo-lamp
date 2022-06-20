import {createTransport, Transporter} from "nodemailer"
import { HttpError } from "../../../utility/error/http_error";
import { ResponseCode } from "../../../utility/response/response";
import {connect} from 'node-mailjet';

export class MailService {

    private transporter:Transporter
    private mailjetPublicKey:string;
    private mailjetPrivateKey:string;
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
            this.mailjetPrivateKey = process.env.MJ_APIKEY_PRIVATE as string;
            this.mailjetPublicKey = process.env.MJ_APIKEY_PUBLIC as string;
    }

    public async sendMailWithSmtp (recepientEmail:string,subject:string,message:string){
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

    public sendMailWithMailJet = async (receiverEmail:string,messageSubject:string,messageBody:string)=>{
        const mailjet = connect(this.mailjetPublicKey,this.mailjetPrivateKey);
        const request = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "filtarhq@gmail.com",
                            "Name": "Filtar Africa"
                        },
                        "To": [
                            {
                                "Email": `${receiverEmail}`
                            }
                        ],
                        "Subject": `${messageSubject}`,
                        "HTMLPart": `${messageBody}`
                    }
                ]
            }) 
            
            request.body.Messages.forEach((message)=>{
                if(message.Status != 'success'){
                    throw new HttpError(`Email to ${message.To} failed`,ResponseCode.INTERNAL_SERVER_ERROR);
                }
            })
    }

}