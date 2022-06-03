import {createLogger,format,transports,Logger,LoggerOptions,stream} from "winston";

    let logger:Logger

    //if(process.env.NODE_ENV != "production"){
    let consoleTransport = new transports.Console({
            format: format.combine(
                format.colorize({colors:{ info: 'blue', error: 'red' }}),
                format.printf(({ timestamp, level, message, metadata }) => {
            return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
            })
            )
        })
    //}

    // let productionTransport = new transports.File({
    //         dirname: "logs",
    //         filename: `errors for ${new Date().toLocaleDateString()}`,
    //         format: format.combine(format.json()),
    //         level:"error"
    //     })

    export function loggerInit(){
        logger = createLogger({
            transports:[
                consoleTransport
            ],
            format: format.combine(format.metadata(), format.timestamp()),
            exitOnError:true
        })
    }



    export function logInfo  (message:string,metadata:any = null){
        logger.info(message,metadata)
    }

    export function logError  (message:string,stacktrace:any = null){
        logger.error(message,stacktrace);
    }

