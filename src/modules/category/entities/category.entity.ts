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

    @OneToMany(() =>PackageToCategory, packageToCategory => packageToCategory.category)
    packageToCategory!: PackageToCategory[];


    @OneToMany(() =>OrderEntity, order => order.category)
    orders!: OrderEntity[];

    @OneToMany(() =>FrameEntity, frame => frame.category)
    frames!: FrameEntity[];

    @CreateDateColumn()
    createdDate!: Date;

}