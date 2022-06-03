import express from 'express';
import { dataSource } from './utility/persistence/data-source';
import { logError, loggerInit, logInfo } from './utility/logging/winston';
import {errorMiddleware} from './utility/middleware/error.middleware';
import "reflect-metadata";
require('express-async-errors');
import * as dotenv from "dotenv";
import { CategoryController } from './controllers/category.controller';
import { PackageController } from './controllers/package.controller';
import { ImageController } from './controllers/image.controller';
import { PlatformController } from './controllers/platform.controller';
import { FrameController } from './controllers/frame.controller';
import { OrderController } from './controllers/order.controller';
dotenv.config();
class Server {

    private categoryController!:CategoryController
    private packageController!:PackageController
    private imageController!:ImageController
    private platformController!:PlatformController
    private frameController!:FrameController
    private orderController!:OrderController
    private app: express.Application;
    constructor(){
        this.app = express(); // init the application
        this.configuration();
        this.routes();
    }


    public configuration() {
        loggerInit()
    
        process.on('uncaughtException',(ex)=>{
            logError(`${ex.message} : `,ex)
        })
    
        process.on('unhandledRejection',(ex)=>{
            logError("Unhandled Promise Rejection:",ex)
        })
    
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        dataSource.initialize().then( (dataSource)=>{
            logInfo(`Connected to database ${dataSource.driver.database}`,{})
        })
    }

    public async routes(){

        this.categoryController = new CategoryController()
        this.packageController = new PackageController()
        this.imageController = new ImageController()
        this.frameController = new FrameController()
        this.platformController = new PlatformController()
        this.orderController = new OrderController()
        this.app.use("/v1/category",this.categoryController.router);
        this.app.use("/v1/package",this.packageController.router);
        this.app.use("/v1/image",this.imageController.router);
        this.app.use("/v1/frame",this.frameController.router);
        this.app.use("/v1/platform",this.platformController.router);
        this.app.use("/v1/order",this.orderController.router);
        this.app.use(errorMiddleware);
    }



    public start(){
        this.app.listen(this.app.get('port'), () => {
            logInfo(`Server is listening ${this.app.get('port')} port.`)
        });
    }
}

const server = new Server();
server.start();