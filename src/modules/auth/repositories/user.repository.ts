import {dataSource } from "../../../utility/persistence/data-source"
import { PaginatedList } from "../../../utility/response/pagination";
import { Roles } from "../constants/role.constant";
import { UserEntity } from "../entities/user.entity"

export const userRepository = dataSource.getRepository(UserEntity).extend({
        async getById(id:string):Promise<UserEntity>{
        const entity = await this.createQueryBuilder().where({id:id}).getOne();
        return entity!;
        },
        async getOneByPredicate(whereCondition:any):Promise<UserEntity>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<UserEntity>>{
            const entities = new PaginatedList<UserEntity>(page);
            const entityItems = await this
                                .createQueryBuilder("User")
                                .where(whereCondition)
                                .orderBy("User.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        },
        async getArDevs():Promise<UserEntity[]>{
            const entityItems = await this
                                .createQueryBuilder("User")
                                .where({role:Roles.ARDEV})
                                .orderBy("User.currentWorkload","ASC")
                                .getMany();
            return entityItems;
        }
})