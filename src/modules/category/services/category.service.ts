import { PaginatedList } from "../../../utility/response/pagination";
import { CategoryEntity } from "../entities/category.entity";
import { categoryRepository } from "../repositories/category.repository";

export class CategoryService {

    public create = async (category: CategoryEntity):Promise<CategoryEntity> => {  
        await categoryRepository.save(category)
        return category;
    } 

    public update = async (category: CategoryEntity) => {
        await categoryRepository.update(category.id,category);
        return category;
    }


    public getById =  async (id:string):Promise<CategoryEntity> =>{
        const category = await categoryRepository.getById(id);
        return category!;
    }

    public getCategory =  async (whereCondition:any={}):Promise<CategoryEntity> =>{
        const category = await categoryRepository.getOneByPredicate(whereCondition)
        return category!;
    }

    public getCategories = async(page:number = 1,whereCondition:any={}):Promise<PaginatedList<CategoryEntity>>=>{
        const categories = await categoryRepository.getByPredicate(whereCondition,page)
        return categories;
    }

    public delete = async (id: string) => {
        const deletedPost = await categoryRepository.delete(id);
        return deletedPost;
    }

}