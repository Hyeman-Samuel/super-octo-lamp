import { PaginatedList } from "../../../utility/response/pagination";
import { PlatformEntity } from "../entities/platform.entity";
import { platformRepository } from "../repositories/platform.repository";
import { platformPackageRepository } from "../platform_package/repositories/platform_package.repository";
import { PackageToPlatform } from "../platform_package/entities/platform_package.entity";
import { PackageEntity } from "../../package/entities/package.entity";
import { packageRepository } from "../../package/repositories/package.repository";
import { HttpError } from "../../../utility/error/http_error";
import { ResponseCode } from "../../../utility/response/response";

export class PlatformService {

    public create = async (platform: PlatformEntity):Promise<PlatformEntity> => {  
        await platformRepository.save(platform)
        return platform;
    } 

    public update = async (platform: PlatformEntity) => {
        await platformRepository.update(platform.id,platform);
        return platform;
    }


    public getById =  async (id:string):Promise<PlatformEntity> =>{
        const platform = await platformRepository.getById(id);
        return platform!;
    }

    public getPlatform =  async (whereCondition:any={}):Promise<PlatformEntity> =>{
        const platform = await platformRepository.getOneByPredicate(whereCondition)
        return platform!;
    }

    public getPlatforms = async(page:number = 1,whereCondition:any={}):Promise<PaginatedList<PlatformEntity>>=>{
        const platforms = await platformRepository.getByPredicate(whereCondition,page)
        return platforms;
    }

    public getPlatformsForPackage = async(packageId:string,page:number = 1):Promise<PaginatedList<PackageToPlatform>>=>{
        const platforms =  await platformPackageRepository.getPlatformsByPackage(packageId)
        return platforms;
    }
    public getPlatformsForPackageByAlias = async(alias:string,page:number = 1):Promise<PaginatedList<PackageToPlatform>>=>{
        const {id} = await packageRepository.getOneByPredicate({alias}) 
        const platforms =  await platformPackageRepository.getPlatformsByPackage(id)
        return platforms;
    }

    public assignToPackage = async(price:number,platform:PlatformEntity,_package:PackageEntity)=>{
        const alreadyExists = await platformPackageRepository.getOneByPredicate({package:_package,platform:platform})
        if(alreadyExists){
            throw new HttpError("association already exists",ResponseCode.CONFLICT);
        }
        const packagePlatform= {
            package:_package,
            packageId:_package.id,
            platform:platform,
            platformId:_package.id,
            price:price
        } as PackageToPlatform
        
        const packageExists = await packageRepository.getById(_package.id);
        packageExists.basePrice = (packageExists.basePrice && packageExists.basePrice > price)?packageExists.basePrice:price;
        Promise.all([
        await packageRepository.update(packageExists.id,packageExists),
        await platformPackageRepository.save(packagePlatform)
        ])
    
    }

    public delete = async (id: string) => {
        const deleted = await platformRepository.delete(id);
        return deleted;
    }

}