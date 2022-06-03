import {dataSource } from "../../../utility/persistence/data-source"
import { PaginatedList } from "../../../utility/response/pagination";
import { PackageEntity} from "../entities/package.entity"

export const packageRepository = dataSource.getRepository(PackageEntity).extend({
        async getById(id:string){
            const entity = await this.createQueryBuilder().where({id:id}).getOne();
            return entity!;
        },
        async getOneByPredicate(whereCondition:any):Promise<PackageEntity>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<PackageEntity>>{
            const entities = new PaginatedList<PackageEntity>(page);
            const entityItems = await this
                                .createQueryBuilder("Package")
                                .where(whereCondition)
                                .orderBy("Package.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        }
})