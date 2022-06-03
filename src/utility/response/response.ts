import {Response} from "express";
import { HttpError } from "../error/http_error";
export enum ResponseCode{
    OK=200,
    NO_CONTENT=201,
    BAD_REQUEST=400,
    INTERNAL_SERVER_ERROR=500,
    NOT_FOUND=404,
    FORBIDDEN=403,
    UNAUTHORIZED=401,
    CONFLICT=409
}


export class ResponseBody{
    message!:string
    payload!:any
    status!:number
}

    export function respond(res:Response, data:any = {},message:string = "",code:ResponseCode = ResponseCode.OK){
        const statusCode = code
        let responseBody = {
            message:message,
            payload:data,
            status:statusCode
        }as ResponseBody
        res.status(statusCode).send(responseBody);
    }

    export function respondToError(res:Response,error:HttpError,data:any = undefined){
        const statusCode = error.statusCode
        let responseBody = {
            message:error.message,
            payload:(!data)?{}:data,
            status:statusCode
        }as ResponseBody
        res.status(statusCode).send(responseBody);
    }


