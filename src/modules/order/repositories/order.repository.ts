import {dataSource } from "../../../utility/persistence/data-source"
import { PaginatedList } from "../../../utility/response/pagination";
import {OrderEntity } from "../entities/order.entity"

export const orderRepository = dataSource.getRepository(OrderEntity).extend({
        async getById(id:string):Promise<OrderEntity>{
        const entity = await this.createQueryBuilder().where({id:id}).getOne();
        return entity!;
        },
        async getOneByPredicate(whereCondition:any):Promise<OrderEntity>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<OrderEntity>>{
            const entities = new PaginatedList<OrderEntity>(page);
            const entityItems = await this
                                .createQueryBuilder("Order")
                                .where(whereCondition)
                                .orderBy("Order.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        }
})