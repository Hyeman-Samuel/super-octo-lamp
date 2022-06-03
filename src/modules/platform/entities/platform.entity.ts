import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,OneToMany } from "typeorm";
import { PackageToPlatform } from "../platform_package/entities/platform_package.entity";
import { Platform } from "../constants/platform.constant";
import { OrderDetailEntity } from "../../order/orderdetails/entities/orderdetail.entity";


@Entity('Platform')
export class PlatformEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;


    @Column({unique:true})
    name!:Platform

    @OneToMany(() =>OrderDetailEntity, orderDetails => orderDetails.platform)
    orderDetails!: OrderDetailEntity[];

    @OneToMany(() =>PackageToPlatform, packageToCategory => packageToCategory.platform)
    packageToPlatform!: PackageToPlatform[];

    @CreateDateColumn()
    createdDate!: Date;



}