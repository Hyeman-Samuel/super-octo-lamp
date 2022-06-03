import { ResponseCode } from "../response/response";

export class HttpError extends Error {
    public statusCode:ResponseCode;
    constructor(message:string,responseType:ResponseCode) {
    super(message);
    this.statusCode = responseType;
    }
}