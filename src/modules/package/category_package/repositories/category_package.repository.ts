import {dataSource } from "../../../../utility/persistence/data-source"
import { PaginatedList } from "../../../../utility/response/pagination";
import { PackageToCategory} from "../entities/category_package.entity";

export const categoryPackageRepository = dataSource.getRepository(PackageToCategory).extend({
        async getById(id:string):Promise<PackageToCategory>{
        const category = await this.createQueryBuilder().where({id:id}).getOne();
        return category!;
        },
        async getOneByPredicate(whereCondition:any):Promise<PackageToCategory>{
            const entity = await this.createQueryBuilder().where(whereCondition).getOne();
        return entity!;
        },
        async getByPredicate(whereCondition:any,page:number=1):Promise<PaginatedList<PackageToCategory>>{
            const entities = new PaginatedList<PackageToCategory>(page);
            const entityItems = await this
                                .createQueryBuilder("PackageCategory")
                                .where(whereCondition)
                                .orderBy("PackageCategory.createdDate","DESC")
                                .skip(entities.skip())
                                .take(entities.take())
                                .getMany();
            entities.setItems(entityItems)
            return entities;
        },
        async getPackagesByCategory(categoryId:string):Promise<PaginatedList<PackageToCategory>>{

            const _packagesList = new PaginatedList<PackageToCategory>()
            const _packages = await this.createQueryBuilder("PackageCategory").where({categoryId}).innerJoinAndSelect("PackageCategory.package","Package").getMany()
            _packagesList.setItems(_packages)
            return _packagesList;
        }

})