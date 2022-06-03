
import { PaginatedList } from "../../../utility/response/pagination";
import { UserEntity } from "../entities/user.entity";
import { userRepository } from "../repositories/user.repository";

export class UserService {

    public create = async (user: UserEntity):Promise<UserEntity> => {  
        await userRepository.save(user)
        return user;
    } 

    public update = async (user: UserEntity) => {
        await userRepository.update(user.id,user);
        return user;
    }

    public increaseArDevWorkload =async (arDev:UserEntity)=>{
        arDev.currentWorkload += 1;
        await userRepository.update(arDev.id,arDev);
        return arDev;
    }

    public getById =  async (id:string):Promise<UserEntity> =>{
        const user = await userRepository.getById(id);
        return user!;
    }

    public getUser =  async (whereCondition:any={}):Promise<UserEntity> =>{
        const user = await userRepository.getOneByPredicate(whereCondition)
        return user!;
    }

    public getUsers = async(page:number = 1,whereCondition:any={}):Promise<PaginatedList<UserEntity>>=>{
        const users = await userRepository.getByPredicate(whereCondition,page)
        return users;
    }

    public delete = async (id: string) => {
        const deletedPost = await userRepository.delete(id);
        return deletedPost;
    }

    public getArDevWithTheLeastWorkload = async ():Promise<UserEntity>=>{
        const arDevs = await userRepository.getArDevs();
        return arDevs[0];
    }

}