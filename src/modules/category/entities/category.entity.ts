import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,OneToMany } from "typeorm";
import { FrameEntity } from "../../frame/entities/frame.entity";
import { OrderEntity } from "../../order/entities/order.entity";


import { PackageToCategory} from "../../package/category_package/entities/category_package.entity"

@Entity('Category')
export class CategoryEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!:string

    @Column({unique:true})
    alias!:string

    @Column()
    description!:string

    @Column()
    thumbnailLink!:string

    @Column({default:false})
    mustReachOut!:Boolean

    @OneToMany(() =>PackageToCategory, packageToCategory => packageToCategory.category)
    packageToCategory!: PackageToCategory[];


    @OneToMany(() =>OrderEntity, order => order.category)
    orders!: OrderEntity[];

    @OneToMany(() =>FrameEntity, frame => frame.category)
    frames!: FrameEntity[];

    @Column({default:true})
    isActive!:Boolean

    @Column({default:new Date()})
    releaseDate!:Date

    @Column({default:true})
    isPresented!:Boolean

    @CreateDateColumn()
    createdDate!: Date;

}