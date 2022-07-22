import { MigrationInterface, QueryRunner } from "typeorm"
import { uuid } from "uuidv4"
import { UserEntity } from "../modules/auth/entities/user.entity"
import { CategoryEntity } from "../modules/category/entities/category.entity"
import { PackageToCategory } from "../modules/package/category_package/entities/category_package.entity"
import { PackageEntity } from "../modules/package/entities/package.entity"
import { Platform } from "../modules/platform/constants/platform.constant"
import { PlatformEntity } from "../modules/platform/entities/platform.entity"
import { PackageToPlatform } from "../modules/platform/platform_package/entities/platform_package.entity"
import {randomBytes,pbkdf2Sync} from "crypto"
import { Roles } from "../modules/auth/constants/role.constant"

export class seeder1654254377268 implements MigrationInterface {

    categories:CategoryEntity[]
    packages:PackageEntity[]
    platforms:PlatformEntity[]
    packageCategoryJoin:PackageToCategory[] =[]
    packagePlatfromJoin:PackageToPlatform[]=[]
    users:UserEntity[]
    constructor() {       
            this.categories = [{
                id:uuid(),
                name:"Wedding",
                alias:"wedding",
                description:"A wedding party is about to resurface again. Owambe shenanigans captured unfiltered using our filtar.",
                thumbnailLink:"https://res.cloudinary.com/filtarhq/image/upload/v1652961941/background/wedding_gfnenm.png",
                createdDate:new Date()
            },
            {
                id:uuid(),
                name:"Product Launch",
                alias:"product-launch",
                description:"We are about to experience “a better time”. What is #ABT with a loose tongue?",
                thumbnailLink:"https://res.cloudinary.com/filtarhq/image/upload/v1652961936/background/product_zbuptk.png",
                createdDate:new Date()
            },
            {
                id:uuid(),
                name:"Graduation",
                alias:"graduation",
                description:"(4 + x) years ended, certificate in your hands, celebration of your grad. memories of the day captured uniquely with filtars.",
                thumbnailLink:"https://res.cloudinary.com/filtarhq/image/upload/v1652961894/background/hero-phone_ubvkc7.png",
                createdDate:new Date()
            },
            {
                id:uuid(),
                name:"Birthdays",
                alias:"birthdays",
                description:"It is all about our star girl, Jola. Let's join her to reminisce on the best songs her existence on earth have composed to us; while celebrating her birthday in grand style.",
                thumbnailLink:"https://res.cloudinary.com/filtarhq/image/upload/v1652961941/background/birthday_uow5ad.png",
                createdDate:new Date()
            },
            {
                id:uuid(),
                name:"Hangouts",
                alias:"hangouts",
                description:"In a gathering of 4 - 6 people, a hangout is established. Hangout with your family and friends with our filtar.",
                thumbnailLink:"https://res.cloudinary.com/filtarhq/image/upload/v1652961938/background/hangouts_o570tm.png",
                createdDate:new Date()
            },
            {
                id:uuid(),
                name:"General Parties",
                alias:"general-parties",
                description:"You can get high on the mainland without traveling to the island. Block your best buddies at the Mainland Block Party.",
                thumbnailLink:"https://res.cloudinary.com/filtarhq/image/upload/v1652961942/background/parties_hbk2sy.png",
                createdDate:new Date()
            },
        ] as CategoryEntity[]

        this.packages = [{
            id:uuid(),
            name:"Silver",
            alias:"silver",
            description:"One design frame for your pre wedding photoshoot",
            basePrice:15000.00,
            createdDate:new Date()
        },
        {
            id:uuid(),
            name:"Gold",
            alias:"gold",
            description:"Two design frames for your pre wedding photoshoot + two digital confetti",
            basePrice:25000.00,
            createdDate:new Date()
        },
        {
            id:uuid(),
            name:"Platinum",
            alias:"platinum-first",
            description:"Three design frames for your pre wedding photoshoot + a digital confetti + a custom song of your choice",
            basePrice:40000.00,
            createdDate:new Date()
        }] as PackageEntity[]

        this.platforms = [{
            id:uuid(),
            name:Platform.INSTAGRAM,
            createdDate:new Date()
        },
        {
            id:uuid(),
            name:Platform.SNAPCHAT,
            createdDate:new Date()
        }] as PlatformEntity[]

        this.categories.forEach((category)=>{
            this.packages.forEach((_package)=>{
                this.packageCategoryJoin.push({
                id:uuid(),
                package:_package,
                packageId:_package.id,
                category:category,
                categoryId:category.id,
                createdDate:new Date()
                })
            })
        })

        this.platforms.forEach((platform)=>{
            const priceDifference = 10000;
            this.packages.forEach((_package,index)=>{
                this.packagePlatfromJoin.push({
                    id:uuid(),
                    package:_package,
                    packageId:_package.id,
                    platform:platform,
                    platformId:platform.id,
                    price:_package.basePrice,
                    createdDate:new Date()
                } as PackageToPlatform)
            })
        })


        const salt = randomBytes(16).toString('hex');

        this.users = [{
            id:uuid(),
            email:'admin@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Admin",
            lastname:"User",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.SUPERADMIN,
            createdDate:new Date()
        },
        {
            id:uuid(),
            email:'danny@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Daniel",
            lastname:"Wusu",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.ARDEV,
            createdDate:new Date()
        },
        {
            id:uuid(),
            email:'tito@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Tito",
            lastname:"Shobanke",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.ARDEV,
            createdDate:new Date()
        },
        {
            id:uuid(),
            email:'seyi@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Seyi",
            lastname:"Adebanjo",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.ARDEV,
            createdDate:new Date()
        },
        {
            id:uuid(),
            email:'Joel@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Joel",
            lastname:"Fasanmi",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.ARDEV,
            createdDate:new Date()
        },
        {
            id:uuid(),
            email:'dan@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Daniel",
            lastname:"Fasanmi",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.DELIVERY,
            createdDate:new Date()
        },
        {
            id:uuid(),
            email:'oluchi@filtar.africa',
            hash:pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
            firstname:"Oluchi",
            lastname:"Ogbonanya",
            phoneNumber:"08097218939",
            salt:salt,
            role:Roles.DELIVERY,
            createdDate:new Date()
        },
        ] as UserEntity[]
    }
    

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.manager.insert<CategoryEntity>(CategoryEntity,this.categories),
            await queryRunner.manager.insert<PackageEntity>(PackageEntity,this.packages),
            await queryRunner.manager.insert<PlatformEntity>(PlatformEntity,this.platforms),
            await queryRunner.manager.insert<PackageToCategory>(PackageToCategory,this.packageCategoryJoin),
            await queryRunner.manager.insert<PackageToPlatform>(PackageToPlatform,this.packagePlatfromJoin),
            await queryRunner.manager.insert<UserEntity>(UserEntity,this.users)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.manager.delete<PackageToCategory>(PackageToCategory,this.packageCategoryJoin.map((value)=>{return value.id})),
        await queryRunner.manager.delete<PackageToPlatform>(PackageToPlatform,this.packagePlatfromJoin.map((value)=>{return value.id})),
        await queryRunner.manager.delete<CategoryEntity>(CategoryEntity,this.categories.map((value)=>{return value.id})),
        await queryRunner.manager.delete<PackageEntity>(PackageEntity,this.packages.map((value)=>{return value.id})),
        await queryRunner.manager.delete<PlatformEntity>(PlatformEntity,this.platforms.map((value)=>{return value.id}))
        await queryRunner.manager.delete<UserEntity>(UserEntity,this.users.map((value)=>{return value.id}))

    }

}
