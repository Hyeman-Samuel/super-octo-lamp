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
            this.categories.forEach(async (value)=>{
                await queryRunner.query(
                    `INSERT INTO "Category" ("id", "name", "alias", "description", "thumbnailLink", "createdDate")
                    VALUES ($1, $2, $3, $4, $5, $6)`,
                    [value.id,value.name,value.alias,value.description,value.thumbnailLink,value.createdDate]
                )
            })
            this.packages.forEach(async (value)=>{
                await queryRunner.query(
                    `INSERT INTO "Package" ("id", "name", "alias", "description", "basePrice", "createdDate")
                    VALUES ($1, $2, $3, $4, $5, $6)`,
                    [value.id,value.name,value.alias,value.description,value.basePrice,value.createdDate]
                )
                await queryRunner.manager.save(value)
            })
            this.platforms.forEach(
                async (value)=>{ 
                    await queryRunner.query(
                        `INSERT INTO "Platform" ("id", "name", "createdDate")
                        VALUES ($1, $2, $3)`,
                        [value.id,value.name,value.createdDate]
                    )
                    await queryRunner.manager.save(value)
                }
            )
            this.packageCategoryJoin.forEach(
                async (value)=>{ 
                    await queryRunner.query(
                        `INSERT INTO "PackageCategory" ("id","packageId", "categoryId", "createdDate")
                        VALUES ($1, $2, $3, $4)`,
                        [value.id,value.packageId,value.categoryId,value.createdDate]
                    )
                }
            )
            this.packagePlatfromJoin.forEach(
                async (value)=>{ 
                    await queryRunner.query(
                        `INSERT INTO "PackagePlatform" ("id", "packageId", "platformId", "createdDate")
                        VALUES ($1, $2, $3, $4)`,
                        [value.id,value.packageId,value.platformId,value.createdDate]
                    )
                }
            )
            this.users.forEach(
                async (value)=>{ 
                    await queryRunner.query(
                        `INSERT INTO "User" ("id","email","hash", "firstname","lastname","phoneNumber",
                        "salt","role","createdDate")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                        [value.id,value.email,value.hash,value.firstname,value.lastname,value.phoneNumber,value.salt,value.role,value.createdDate]
                    )
                }
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.categories.forEach(async (value)=>{
            await queryRunner.query(
                `DELETE FROM "Category" WHERE "id"=$1`,
                [value.id]
            )
        })

        this.packages.forEach(async (value)=>{
            await queryRunner.query(
                `DELETE FROM "Package" WHERE "id"=$1`,
                [value.id]
            )
        })

        this.platforms.forEach(async (value)=>{
            await queryRunner.query(
                `DELETE FROM "Platform" WHERE "id"=$1`,
                [value.id]
            )
        })

        this.packageCategoryJoin.forEach(async (value)=>{
            await queryRunner.query(
                `DELETE FROM "PackageCategory" WHERE "id"=$1`,
                [value.id]
            )
        })

        this.packagePlatfromJoin.forEach(async (value)=>{
            await queryRunner.query(
                `DELETE FROM "PackagePlatform" WHERE "id"=$1`,
                [value.id]
            )
        })

        this.users.forEach(async (value)=>{
            await queryRunner.query(
                `DELETE FROM "User" WHERE "id"=$1`,
                [value.id]
            )
        })

    }

}
