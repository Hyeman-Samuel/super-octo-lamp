import { Request, Router,Response } from "express";
import { Platform } from "../constants/platform.constant";
import { PlatformRequestBody } from "../dtos/platform.dto";
import { PlatformEntity } from "../entities/platform.entity";
import { PlatformService } from "../services/platform.service";
import { validationMiddleware } from "../../../utility/middleware/validation.middleware";
import { respond} from "../../../utility/response/response";

export class PlatformController {
    public router: Router;
    private platformService:PlatformService;

    constructor() {
    this.platformService = new PlatformService();
    this.router = Router();
    this.routes();
    }


    private getPlatforms= async (req:Request,res:Response)=>{
        const platforms = await this.platformService.getPlatforms()
        const message = (platforms.itemsCount == 0)?"No Platforms":""
        respond(res,platforms,message);
    }

    private createPlatform= async(req:Request,res:Response)=>{

        const platform = new PlatformEntity();
        platform.name = Platform.SNAPCHAT;
        await this.platformService.create(platform);
        respond(res,platform);
    }

    private deletePlatform = async(req:Request,res:Response)=>{
        await this.platformService.delete(req.params.id)
        respond(res,{},"deleted");
    }

    private routes(){
        this.router.get("/",this.getPlatforms)
        this.router.post("/",this.createPlatform)
        this.router.delete("/:id",this.deletePlatform)
    }
}  