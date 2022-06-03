import {dataSource } from "../../../utility/persistence/data-source"
import { PaginatedList } from "../../../utility/response/pagination";
import {FrameEntity } from "../entities/frame.entity"

export const frameRepository = dataSource.getRepository(FrameEntity).extend({
        async getById(id:string):Promise<FrameEntity>{
        const entity = await this.createQueryBuilder().where({id:id}).getOne();
        return entity!;
        },
        async getOneByPredicate(whereCondition:any):Promise<FrameEntity>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<FrameEntity>>{
            const entities = new PaginatedList<FrameEntity>(page);
            const entityItems = await this
                                .createQueryBuilder("Frame")
                                .where(whereCondition)
                                .orderBy("Frame.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        }
})