import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,OneToMany, ManyToOne } from "typeorm";
import { Currency } from "../../../common/constants";
import { PlatformEntity } from "../../../platform/entities/platform.entity";
import { OrderEntity } from "../../entities/order.entity";
import { OrderStatus } from "../constants/orderdetail.constant";

@Entity('OrderDetails')
export class OrderDetailEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({nullable:true})
    link!:string

    @Column({default:OrderStatus.PROCESSING})
    status!:OrderStatus


    @Column({default:Currency.NAIRA})
    public currency!: Currency
    
    @Column({type:"decimal", precision: 10, scale: 2, default: 0.0})
    price!:number

    @Column()
    platformName!:string

    @ManyToOne(() => OrderEntity, (user) => user.orderDetails)
    order!: OrderEntity

    @ManyToOne(() => PlatformEntity, (platform) => platform.orderDetails)
    platform!: PlatformEntity

}