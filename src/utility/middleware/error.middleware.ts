import { NextFunction ,Request,Response} from "express";
import {respond, respondToError, ResponseCode}from '../response/response'
import { HttpError } from "../error/http_error";
import { logError } from "../logging/winston";
export function errorMiddleware(err:Error,req:Request,res:Response,next:NextFunction){

    if(err instanceof HttpError){
        respondToError(res,err);
    }else{
        respond(res,{},err.message,ResponseCode.INTERNAL_SERVER_ERROR)
        logError(err.message,err.stack)
    }
}
