import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { Currency } from "../../../common/constants"
import { PackageEntity } from "../../../package/entities/package.entity"
import { PlatformEntity } from "../../entities/platform.entity"

@Entity("PackagePlatform")
export class PackageToPlatform {
    @PrimaryGeneratedColumn("uuid")
    public id!: string

    @Column()
    public packageId!: string

    @Column()
    public platformId!: string

    @Column({type:"decimal", precision: 10, scale: 2, default: 0.0})
    price!:number

    @Column({default:Currency.NAIRA})
    public currency!: Currency

    @ManyToOne(() => PackageEntity, (_package) => _package.packageToPlatform,{eager:true})
    public package!: PackageEntity

    @ManyToOne(() => PlatformEntity, (platform) => platform.packageToPlatform)
    public platform!: PlatformEntity

    @CreateDateColumn()
    createdDate!: Date;
}