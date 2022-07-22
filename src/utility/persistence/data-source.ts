import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
import { CategoryEntity } from '../../modules/category/entities/category.entity';
import { FrameEntity } from '../../modules/frame/entities/frame.entity';
import { OrderEntity } from '../../modules/order/entities/order.entity';
import { PackageEntity } from '../../modules/package/entities/package.entity';
import { PlatformEntity } from '../../modules/platform/entities/platform.entity';
import { PackageToCategory } from '../../modules/package/category_package/entities/category_package.entity';
import { PackageToPlatform } from '../../modules/platform/platform_package/entities/platform_package.entity';
import { UserEntity } from '../../modules/auth/entities/user.entity';
import { OrderDetailEntity } from '../../modules/order/orderdetails/entities/orderdetail.entity';
dotenv.config();

//const entitiesDir = (process.env.NODE_ENV != "development")?"src/**/*.entity{.js}":"src/**/*.entity{.ts}"

const migrationsDir = (process.env.NODE_ENV != "development")?"src/migrations/**{.ts,.js}":"src/migrations/**{.ts,.js}"

    export let dataSource = new DataSource({
            type: "postgres",
            name: 'default',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 5432),
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'localhost',
            migrationsRun:true,
            synchronize: false,
            logging: true,
            entities: [
                CategoryEntity,
                FrameEntity,
                OrderEntity,
                OrderDetailEntity,
                PackageEntity,
                PackageToCategory,
                PackageToPlatform,
                PlatformEntity,
                UserEntity
            ],
            migrations:[
                "src/migrations/**{.ts,.js}"
            ]

        })




