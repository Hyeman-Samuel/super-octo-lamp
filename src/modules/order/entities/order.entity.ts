import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,OneToMany, ManyToOne } from "typeorm";
import { UserEntity } from "../../auth/entities/user.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { Currency } from "../../common/constants";
import { PackageEntity } from "../../package/entities/package.entity";

import { OrderStage } from "../constants/order.constant";
import { OrderDetailEntity } from "../orderdetails/entities/orderdetail.entity";

@Entity('Order')
export class OrderEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    orderRefrence!:string

    @Column({nullable:true})
    paymentRefrence!:string

    @Column({type:"decimal", precision: 10, scale: 2, default: 0.0})
    price!:number

    @Column({default:Currency.NAIRA})
    public currency!: Currency

    @Column({default:OrderStage.PENDING_PAYMENT})
    stage!:OrderStage

    @Column({nullable:true})
    deliveryMessage!:string

    @Column()
    email!:string

    @Column()
    firstname!:string

    @Column()
    lastname!:string

    @Column()
    phoneNumber!:string

    @Column('jsonb', {nullable: true})
    designImages!:object

    @Column('jsonb', {nullable: true})
    hashtags!:object

    @Column('jsonb', {nullable: true})
    songs!:object

    @ManyToOne(() => CategoryEntity, (category) => category.orders,{eager:true})
    category!: CategoryEntity

    @ManyToOne(() => PackageEntity, (_package) => _package.orders)
    package!: PackageEntity

    @ManyToOne(() => UserEntity, (user) => user.orders,{nullable:true})
    customer!: UserEntity

    @ManyToOne(() => UserEntity, (user) => user.workdone,{nullable:true})
    arDev!: UserEntity

    @OneToMany(() =>OrderDetailEntity, orderDetails => orderDetails.order,{eager:true})
    orderDetails!: OrderDetailEntity[];

    @Column({nullable:true})
    paidOn!:Date

    @CreateDateColumn()
    createdDate!: Date;

}