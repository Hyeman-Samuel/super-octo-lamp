import { Request, Router,Response } from "express";
import { CategoryEntity,CategoryRequestBody,CategoryService } from "..";
import { PackageService } from "../../package";
import { HttpError } from "../../../utility/error";
import { validationMiddleware } from "../../../utility/middleware";
import { respond, ResponseCode } from "../../../utility/response";

export class CategoryController {
    public router: Router;
    private categoryService: CategoryService;
    private packageService:PackageService;

    constructor() {
    this.categoryService = new CategoryService(); 
    this.packageService = new PackageService();
    this.router = Router();
    this.routes();
    }


    private getCategories = async (req:Request,res:Response)=>{
        const categories = await this.categoryService.getCategories()
        const message = (categories.itemsCount == 0)?"No Categories":""
        respond(res,categories,message);
    }

    private getCategoryById = async (req:Request,res:Response)=>{
        const category = await this.categoryService.getById(req.params.id)
        if(!category){
            throw new HttpError("category not found",ResponseCode.NOT_FOUND)
        }
        respond(res,category);
    }

    private getCategoryByAlias = async (req:Request,res:Response)=>{
        const category = await this.categoryService.getCategory({"alias":req.params.alias})
        if(!category){
            throw new HttpError("category not found",ResponseCode.NOT_FOUND)
        }
        respond(res,category);
    }

    private createCategory = async(req:Request,res:Response)=>{
        const requestBody = res.locals.input as CategoryRequestBody
        const category = requestBody as CategoryEntity

        await this.categoryService.create(category);
        respond(res,category);
    }
    
    private updateCategory = async(req:Request,res:Response)=>{
        const {name,thumbnailLink,description} = res.locals.input as CategoryRequestBody
        const category = await this.categoryService.getById(req.params.id)
        category.name = name;
        category.thumbnailLink = thumbnailLink;
        category.description = description;
        await this.categoryService.update(category);
        respond(res,category);
    }

    private getPackagesById = async(req:Request,res:Response)=>{
        const packages = await this.packageService.getByCategoryId(req.params.id)
        if(packages.itemsCount == 0){
            throw new HttpError("No packages",ResponseCode.NO_CONTENT);
        }
        respond(res,packages);
    }

    private getPackagesByAlias = async(req:Request,res:Response)=>{
        const packages = await this.packageService.getByCategoryAlias(req.params.alias)
        if(packages.itemsCount == 0){
            throw new HttpError("No packages",ResponseCode.NO_CONTENT);
        }
        respond(res,packages);
    }


    private deleteCategory = async(req:Request,res:Response)=>{
        await this.categoryService.delete(req.params.id)
        respond(res,{},"deleted");
    }

    private routes(){
        this.router.get("/",this.getCategories)
        //this.router.get("/:id/packages",this.getPackagesById)
        this.router.get("/:alias/packages",this.getPackagesByAlias)
        //this.router.get("/:id",this.getCategoryById)
        this.router.get("/:alias",this.getCategoryByAlias)
        this.router.post("/",validationMiddleware(CategoryRequestBody),this.createCategory)
        this.router.put("/:id",validationMiddleware(CategoryRequestBody),this.updateCategory)
        this.router.delete("/:id",this.deleteCategory)

    }
}  