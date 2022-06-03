import {dataSource } from "../../../utility/persistence/data-source"
import { PaginatedList } from "../../../utility/response/pagination";
import {PlatformEntity } from "../entities/platform.entity"

export const platformRepository = dataSource.getRepository(PlatformEntity).extend({
        async getById(id:string):Promise<PlatformEntity>{
        const entity = await this.createQueryBuilder().where({id:id}).getOne();
        return entity!;
        },
        async getOneByPredicate(whereCondition:any):Promise<PlatformEntity>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<PlatformEntity>>{
            const entities = new PaginatedList<PlatformEntity>(page);
            const entityItems = await this
                                .createQueryBuilder("Platform")
                                .where(whereCondition)
                                .orderBy("Platform.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        }
})