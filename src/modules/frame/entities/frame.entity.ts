import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,
ManyToOne } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";

@Entity('Frame')
export class FrameEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;


    @Column()
    link!:string

    @Column()
    name!:string
    

    @ManyToOne(() => CategoryEntity, (category) => category.frames)
    category!: CategoryEntity

    @CreateDateColumn()
    createdDate!: Date;
}