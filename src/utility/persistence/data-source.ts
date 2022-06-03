import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
dotenv.config();

const entitiesDir = (process.env.NODE_ENV != "development")?"src/**/*.entity{.js}":"src/**/*.entity{.ts}"

const migrationsDir = (process.env.NODE_ENV != "development")?"src/migrations/**{.js}":"src/migrations/**{.ts}"

    export let dataSource = new DataSource({
            type: "postgres",
            name: 'default',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 5432),
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'localhost',
            synchronize: false,
            logging: true,
            entities: [
                entitiesDir
            ],
            migrations:[
                migrationsDir
            ]

        })




