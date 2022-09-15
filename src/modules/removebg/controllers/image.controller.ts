import { Request, Router,Response } from "express";
import { RemoveBgService } from "../services/removebg.service";
import { HttpError } from "../../../utility/error/http_error";
import {tmpdir} from "os";
import multer from "multer"
const upload = multer({ dest: tmpdir() });
import { respond, ResponseCode } from "../../../utility/response/response";
export class ImageController {
    public router: Router;
    private removebgService:RemoveBgService

    constructor() {
    this.removebgService = new RemoveBgService();
    this.router = Router();
    this.routes();
    }

    

    private convertImageToPng = async (req:Request,res:Response)=>{
        const image = req.file;
        if(!image) throw new HttpError("Image required",ResponseCode.BAD_REQUEST)
        let imageInPng=  await this.removebgService.convertToPng(image.path)
        respond(res,imageInPng)
    }



    private routes(){
        this.router.post("/",upload.single('image'),this.convertImageToPng)
    }
}  