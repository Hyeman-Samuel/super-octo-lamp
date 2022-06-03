import { PaginatedList } from "../../../utility/response/pagination";
import { FrameEntity } from "../entities/frame.entity";
import { frameRepository } from "../repositories/frame.repository";

export class FrameService {

    public create = async (frame: FrameEntity):Promise<FrameEntity> => {  
        await frameRepository.save(frame)
        return frame;
    } 

    public update = async (frame: FrameEntity) => {
        await frameRepository.update(frame.id,frame);
        return frame;
    }


    public getById =  async (id:string):Promise<FrameEntity> =>{
        const frame = await frameRepository.getById(id);
        return frame!;
    }

    public getFrame =  async (whereCondition:any={}):Promise<FrameEntity> =>{
        const frame = await frameRepository.getOneByPredicate(whereCondition)
        return frame!;
    }

    public getFrames = async(page:number = 1,whereCondition:any={}):Promise<PaginatedList<FrameEntity>>=>{
        const frames = await frameRepository.getByPredicate(whereCondition,page)
        return frames;
    }

    public delete = async (id: string) => {
        const deleted = await frameRepository.delete(id);
        return deleted;
    }

}