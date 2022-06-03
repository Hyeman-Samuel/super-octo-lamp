import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { PackageEntity } from "../../entities/package.entity"
import { CategoryEntity } from "../../../category/entities/category.entity"

@Entity("PackageCategory")
export class PackageToCategory {
    @PrimaryGeneratedColumn("uuid")
    public id!: string

    @Column()
    public packageId!: string

    @Column()
    public categoryId!: string

    @ManyToOne(() => PackageEntity, (_package) => _package.packageToCategory,{eager:true})
    public package!: PackageEntity

    @ManyToOne(() => CategoryEntity, (category) => category.packageToCategory)
    public category!: CategoryEntity

    @CreateDateColumn()
    createdDate!: Date;
}