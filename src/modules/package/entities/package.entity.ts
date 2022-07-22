import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,OneToMany } from "typeorm";

import { PackageToCategory} from "../category_package/entities/category_package.entity"
import { PackageToPlatform } from "../../platform/platform_package/entities/platform_package.entity";
import { OrderEntity } from "../../order/entities/order.entity";
import { Currency } from "../../common/constants";
@Entity('Package')
export class PackageEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;


    @Column()
    name!:string

    @Column({unique:true})
    alias!:string

    @Column()
    description!:string

    @Column('jsonb', {nullable: true})
    infographicVideos!:string
    
    @Column({default:true})
    active!:boolean

    @Column({default:1})
    numberOfDesigns!:number

    @Column({default:1})
    numberOfHashtags!:number

    @Column({default:0})
    numberOfSongs!:number

    @Column({default:false})
    mustReachOut!:Boolean

    @Column({default:true})
    isActive!:Boolean

    @Column({default:new Date()})
    releaseDate!:Date

    @Column({default:true})
    isPresented!:Boolean

    @Column({default:Currency.NAIRA})
    currency!: Currency
    
    @Column({type:"decimal", precision: 10, scale: 2, default: 0.0,nullable:true})
    basePrice!:number

    @OneToMany(() =>PackageToCategory, packageToCategory => packageToCategory.category)
    packageToCategory!: PackageToCategory[];

    @OneToMany(() =>PackageToPlatform, packageToPlatform => packageToPlatform.platform)
    packageToPlatform!: PackageToPlatform[];

    @OneToMany(() =>OrderEntity, order => order.package)
    orders!: OrderEntity[];

    @CreateDateColumn()
    createdDate!: Date;

}