import { Request, Router,Response } from "express";
import { CategoryService } from "../../category/services/category.service";
import { FrameRequestBody } from "../dtos/frame.dto";
import { FrameEntity } from "../entities/frame.entity";
import { FrameService } from "../services/frame.service";
import { validationMiddleware } from "../../../utility/middleware/validation.middleware";
import { respond} from "../../../utility/response/response";

export class FrameController {
    public router: Router;

    private frameService:FrameService
    private categoryService:CategoryService
    constructor() {
    this.frameService = new FrameService();
    this.categoryService = new CategoryService();
    this.router = Router();
    this.routes();
    }


    private getFrames = async (req:Request,res:Response)=>{
        const frames = await this.frameService.getFrames(Number(req.query.page));
        const message = (frames.itemsCount == 0)?"No Frames":""
        respond(res,frames,message);
    }

    private getFramesByCategory = async (req:Request,res:Response)=>{
        const frames = await this.frameService.getFrames(Number(req.query.page),{categoryId:req.params.categoryId})
        const message = (frames.itemsCount == 0)?"No Frames":""
        respond(res,frames,message);
    }

    private uploadFrames = async(req:Request,res:Response)=>{
        const requestBody = res.locals.input as FrameRequestBody
        const frame = {
            name:requestBody.name,
            link:requestBody.link,
            category:await this.categoryService.getById(requestBody.categoryId)
        } as FrameEntity

        await this.frameService.create(frame);
        respond(res,frame);
    }


    private deleteFrame = async(req:Request,res:Response)=>{
        await this.frameService.delete(req.params.id)
        respond(res,{},"deleted");
    }

    private routes(){
        this.router.get("/",this.getFrames)
        this.router.get("/:categoryId",this.getFramesByCategory)
        this.router.post("/",validationMiddleware(FrameRequestBody),this.uploadFrames)
        this.router.delete("/:id",this.deleteFrame)
    }
}  