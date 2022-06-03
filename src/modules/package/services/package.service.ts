import { CategoryEntity } from "../../category/entities/category.entity";
import { PackageEntity } from "../entities/package.entity";
import { packageRepository} from "../repositories/package.repository";
import {categoryPackageRepository} from "../category_package/repositories/category_package.repository"
import { PackageToCategory } from "../category_package/entities/category_package.entity";
import { PaginatedList } from "../../../utility/response/pagination";
import { categoryRepository } from "../../category/repositories/category.repository";
export class PackageService {

    public create = async (_package: PackageEntity):Promise<PackageEntity> => {  
        await packageRepository.save(_package)
        return _package;
    } 

    public update = async (_package: PackageEntity) => {
        await packageRepository.update(_package.id,_package);
        return _package;
    }


    public getById =  async (id:string):Promise< PackageEntity> =>{
        const _package = await packageRepository.getById(id)
        return _package!;
    }

    public getPackage =  async (whereCondition:any={}):Promise<PackageEntity> =>{
        const _package = await packageRepository.getOneByPredicate(whereCondition)
        return _package!;
    }

    public getPackages = async(page:number = 1,whereCondition:any={})=>{
        const _packages = await packageRepository.getByPredicate(whereCondition,page)
        return _packages;
    }

    public delete = async (id: string) => {
        const deletedItem = await packageRepository.delete(id);
        return deletedItem;
    }

    public assignToCategory = async(_package:PackageEntity,category:CategoryEntity)=>{
        const packageRepository = {
            package:_package,
            packageId:_package.id,
            category:category,
            categoryId:category.id
        } as PackageToCategory
        
        await categoryPackageRepository.save(packageRepository)
    }

    public getByCategoryId = async(categoryId:string):Promise<PaginatedList<PackageToCategory>>=>{
        const _packages = categoryPackageRepository.getPackagesByCategory(categoryId);
    return _packages;
    }

    public getByCategoryAlias = async(alias:string):Promise<PaginatedList<PackageToCategory>>=>{
        const category = await categoryRepository.getOneByPredicate({alias});
        const _packages = categoryPackageRepository.getPackagesByCategory(category.id);
    return _packages;
    }
}