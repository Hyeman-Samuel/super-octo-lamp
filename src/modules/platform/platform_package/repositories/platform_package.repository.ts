import {dataSource } from "../../../../utility/persistence/data-source"
import { PaginatedList } from "../../../../utility/response/pagination";
import { PackageToPlatform} from "../entities/platform_package.entity"
import { PlatformEntity } from "../../entities/platform.entity";

export const platformPackageRepository = dataSource.getRepository(PackageToPlatform).extend({
        async getById(id:string):Promise<PackageToPlatform>{
        const entity = await this.createQueryBuilder().where({id:id}).getOne();
        return entity!;
        },
        async getOneByPredicate(whereCondition:any):Promise<PackageToPlatform>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<PackageToPlatform>>{
            const entities = new PaginatedList<PackageToPlatform>(page);
            const entityItems = await this
                                .createQueryBuilder("PackageToPlatform")
                                .where(whereCondition)
                                .orderBy("PackageToPlatform.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        },
        async getPlatformsByPackage(packageId:string):Promise<PaginatedList<PackageToPlatform>>{
            const platformsList = new PaginatedList<PackageToPlatform>()
            const platform = await this.createQueryBuilder("PackagePlatform").where({packageId}).innerJoinAndSelect("PackagePlatform.platform","Platform").getMany();
            platformsList.setItems(platform)
            return platformsList;
        },
        async calculatePrice(packageId:string,platformId:string):Promise<number>{
        const data =  await this.createQueryBuilder("PackagePlatform")
            .where("PackagePlatform.packageId = :PackageId", { PackageId:packageId}).andWhere("PackagePlatform.platformId = :PlatformId",{PlatformId:platformId}).select("PackagePlatform.price")
            .getOneOrFail()
            return data.price
}
})