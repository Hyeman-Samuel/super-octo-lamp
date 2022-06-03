import {dataSource } from "../../../utility/persistence/data-source"
import { PaginatedList } from "../../../utility/response/pagination";
import { CategoryEntity } from "../entities/category.entity"

export const categoryRepository = dataSource.getRepository(CategoryEntity).extend({
        async getById(id:string):Promise<CategoryEntity>{
        const category = await this.createQueryBuilder().where({id:id}).getOne();
        return category!;
        },
        async getOneByPredicate(whereCondition:any):Promise<CategoryEntity>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<CategoryEntity>>{
            const entities = new PaginatedList<CategoryEntity>(10);
            const entityItems = await this
                                .createQueryBuilder("Category")
                                .where(whereCondition)
                                .orderBy("Category.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        }
})