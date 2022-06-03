import { Request, Router,Response } from "express";
import { CategoryService } from "../modules/category/services/category.service";
import { PackageRequestBody } from "../modules/package/dtos/package.dto";
import { PackageEntity } from "../modules/package/entities/package.entity";
import { PackageService } from "../modules/package/services/package.service";
import { AddPackageToPlatformRequestBody } from "../modules/platform/dtos/platform.dto";
import { PlatformService } from "../modules/platform/services/platform.service";

import { HttpError } from "../utility/error/http_error";
import { validationMiddleware } from "../utility/middleware/validation.middleware";
import { respond, ResponseCode } from "../utility/response/response";

export class PackageController {
    public router: Router;
    private packageService: PackageService;
    private categoryService:CategoryService;
    private platformService:PlatformService;

    constructor() {
    this.packageService = new PackageService(); 
    this.categoryService = new CategoryService();
    this.platformService = new PlatformService();
    this.router = Router();
    this.routes();
    }


    private getPackages = async (req:Request,res:Response)=>{
        const categories = await this.packageService.getPackages()
        const message = (categories.itemsCount == 0)?"No Packages":""
        respond(res,categories,message);
    }

    private getPackageById = async (req:Request,res:Response)=>{
        const _package = await this.packageService.getById(req.params.id)
        if(!_package){
            throw new HttpError("package not found",ResponseCode.NOT_FOUND)
        }
        respond(res,_package);
    }

    private getPackageByAlias = async (req:Request,res:Response)=>{
        const _package = await this.packageService.getPackage({alias:req.params.alias})
        if(!_package){
            throw new HttpError("package not found",ResponseCode.NOT_FOUND)
        }
        respond(res,_package);
    }
    private createPackage = async(req:Request,res:Response)=>{
        const {name,description,alias,infographicVideos} = res.locals.input as PackageRequestBody
        const _package = {
            name:name,
            description:description,
            alias:alias,
            infographicVideos:JSON.parse(JSON.stringify(infographicVideos))
        }as PackageEntity

        await this.packageService.create(_package);
        respond(res,_package);
    }
    
    private updatePackage= async(req:Request,res:Response)=>{
        const {name,description,alias,infographicVideos} = res.locals.input as PackageRequestBody
        const _package= await this.packageService.getById(req.params.id)
        _package.name = name;
        _package.description = description;
        _package.alias = alias;
        _package.infographicVideos = JSON.parse(JSON.stringify(infographicVideos));
        await this.packageService.update(_package);
        respond(res,_package);
    }

    private assignToCategory = async (req:Request,res:Response)=>{
        const _package = await this.packageService.getById(req.params.id);
        if(!_package){
            throw new HttpError("package does not exist",ResponseCode.BAD_REQUEST);
        }
        const category = await this.categoryService.getById(req.params.categoryId);
        if(!category){
            throw new HttpError("category does not exist",ResponseCode.BAD_REQUEST);
        }
        await this.packageService.assignToCategory(_package,category);
        respond(res,{},"Ok");
    }

    private assignToPlatform = async (req:Request,res:Response)=>{
        const {price} = res.locals.input as AddPackageToPlatformRequestBody;
        const _package = await this.packageService.getById(req.params.id);
        if(!_package){
            throw new HttpError("package does not exist",ResponseCode.BAD_REQUEST);
        }
        const platform = await this.platformService.getById(req.params.platformId);
        if(!platform){
            throw new HttpError("package does not exist",ResponseCode.BAD_REQUEST);
        }

        await this.platformService.assignToPackage(price,platform,_package)
        respond(res,{},"Ok");
    }
    private getPlatformsForPackageByAlias = async (req:Request,res:Response)=>{
        const platforms = await this.platformService.getPlatformsForPackageByAlias(req.params.alias)
        if(platforms.itemsCount == 0){
            throw new HttpError("No platforms available",ResponseCode.NOT_FOUND);
        }
        respond(res,platforms);
    }

    private getPlatformsForPackage = async (req:Request,res:Response)=>{
        const platforms = await this.platformService.getPlatformsForPackage(req.params.id)
        if(platforms.itemsCount == 0){
            throw new HttpError("No platforms available",ResponseCode.NOT_FOUND);
        }
        respond(res,platforms);
    }
    private deletePackage = async(req:Request,res:Response)=>{
        await this.packageService.delete(req.params.id)
        respond(res,{},"deleted");
    }

    private routes(){
        this.router.get("/",this.getPackages)
        this.router.get("/:alias/platforms",this.getPlatformsForPackageByAlias)
        //this.router.get("/:id",this.getPackageById)
        this.router.get("/:alias",this.getPackageByAlias)
        this.router.post("/",validationMiddleware(PackageRequestBody),this.createPackage)
        this.router.post("/:id/platform/:platformId",validationMiddleware(AddPackageToPlatformRequestBody),this.assignToPlatform)
        this.router.post("/:id/category/:categoryId",this.assignToCategory)
        this.router.put("/:id",validationMiddleware(PackageRequestBody),this.updatePackage)
        this.router.delete("/:id",this.deletePackage)

    }
}  