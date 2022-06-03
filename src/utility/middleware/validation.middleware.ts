import { validate } from "class-validator";
import { plainToInstance} from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { respondToError, ResponseCode } from "../response/response";
import { HttpError } from "../error/http_error";


export const validationMiddleware = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
    const output: any = plainToInstance(dtoClass, req.body);
    validate(output, { skipMissingProperties: true }).then(errors => {
    // errors is an array of validation errors
    if (errors.length > 0) {
    let errorTexts = Array();
    for (const errorItem of errors) {
    errorTexts = errorTexts.concat(errorItem.constraints);
    }
    respondToError(res,new HttpError("Validation Error",ResponseCode.BAD_REQUEST),errorTexts);

    } else {
    res.locals.input = output;
    next();
    }
    });
    };
    };