import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,OneToMany } from "typeorm";
import { OrderEntity } from "../../order/entities/order.entity";
import { Roles } from "../constants/role.constant";

@Entity('User')
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!:string

    @Column()
    firstname!:string

    @Column()
    lastname!:string

    @Column()
    phoneNumber!:string

    @Column()
    hash!:string

    @Column()
    salt!:string

    @Column()
    role!:Roles

    @Column({default:0})
    currentWorkload!:number

    @OneToMany(() =>OrderEntity, order => order.customer)
    orders!: OrderEntity[];

    @OneToMany(() =>OrderEntity, order => order.arDev)
    workdone!: OrderEntity[];


    @CreateDateColumn()
    createdDate!: Date;

}