import { PaginatedList } from "../../../utility/response/pagination";
import { OrderEntity } from "../entities/order.entity";
import { orderRepository } from "../repositories/order.repository";
import {platformPackageRepository} from "../../platform/platform_package/repositories/platform_package.repository"
import { dataSource } from "../../../utility/persistence/data-source";
import { PackageToPlatform } from "../../platform/platform_package/entities/platform_package.entity";
import { OrderDetailEntity } from "../orderdetails/entities/orderdetail.entity";
import { OrderPreview } from "../dtos/order.dto";
import { UserService } from "../../auth/services/user.service";
import { OrderStage } from "../constants/order.constant";

export class OrderService {

    private userService:UserService
    constructor() {
        this.userService = new UserService()
        
    }
    public create = async (order: OrderEntity):Promise<OrderEntity> => {  

        await orderRepository.save(order)
        return order;
    } 

    public update = async (order: OrderEntity) => {
        await orderRepository.update(order.id,order);
        return order;
    }
    public startProcessingOrder = async(order:OrderEntity)=>{
        await dataSource.transaction(async (transactionalEntityManager) => {
            order.stage = OrderStage.PENDING_UPLOAD;
            order.arDev = await this.userService.getArDevWithTheLeastWorkload();
            await transactionalEntityManager
                .createQueryBuilder()
                .update(OrderEntity)
                .set(order)
                .where("id = :id", { id: order.id })
                .execute();
            await this.userService.increaseArDevWorkload(order.arDev);
        })
        
    }

    public saveOrderAndOrderDetails = async (order:OrderEntity,platformIds:string[])=>{        
        await dataSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(OrderEntity)
                .values(order)
                .execute();
            const packageToPlatforms =   await transactionalEntityManager
            .createQueryBuilder(PackageToPlatform,"PackagePlatform")
            .where("PackagePlatform.packageId = :packageId AND PackagePlatform.platformId IN (:...platformId)", { packageId:order.package.id,platformId:platformIds})
            .innerJoinAndSelect("PackagePlatform.platform","platform")
            .getMany()

            const orderDetails = packageToPlatforms.map<OrderDetailEntity>((value:PackageToPlatform)=>{
                const orderDetail = {
                    platform:value.platform,
                    platformName:value.platform.name,
                    price:value.price,
                    order:order
                } as OrderDetailEntity
                return orderDetail;
            })
            await transactionalEntityManager
                .createQueryBuilder()
                .insert()
                .into(OrderDetailEntity)
                .values(orderDetails)
                .execute();
        })
    }

    public previewOrderDetails=async (packageId:string,platformIds:string[]):Promise<OrderPreview>=>{
        const packageToPlatforms =   await platformPackageRepository
        .createQueryBuilder("PackagePlatform")
        .where("PackagePlatform.packageId = :packageId AND PackagePlatform.platformId IN (:...platformId)", { packageId:packageId,platformId:platformIds})
        .innerJoinAndSelect("Platform","platform",`Platform.id = PackagePlatform.platformId`)
        .getMany()

        const orderDetails = packageToPlatforms.map<OrderDetailEntity>((value:PackageToPlatform)=>{
            const orderDetail = {
                platform:value.platform,
                platformName:value.platform.name,
                price:value.price,
            } as OrderDetailEntity
            return orderDetail;
        })

        const details = new OrderPreview()
        details.total = await platformPackageRepository.calculatePrice(packageId,platformIds);
        details.details =orderDetails;
        return details;
    }


    public getById =  async (id:string):Promise<OrderEntity> =>{
        const order = await orderRepository.getById(id);
        return order!;
    }

    public getOrder =  async (whereCondition:any={}):Promise<OrderEntity> =>{
        const order = await orderRepository.getOneByPredicate(whereCondition)
        return order!;
    }

    public getOrders = async(page:number = 1,whereCondition:any={}):Promise<PaginatedList<OrderEntity>>=>{
        const orders = await orderRepository.getByPredicate(whereCondition,page)
        return orders;
    }

    public delete = async (id: string) => {
        const deleted = await orderRepository.delete(id);
        return deleted;
    }

    public generateOrderRefrence = (len:number = 6)=>{
        var characters = 'ABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = ""
        var charactersLength = characters.length;
        
        for ( var i = 0; i < len ; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public calculatePrice = async (packageId:string,platformIds:string[]):Promise<number>=>{
        return await platformPackageRepository.calculatePrice(packageId,platformIds);
    }
}