import {  IsDefined,IsNotEmpty,IsUUID,IsUrl } from "class-validator";
import {  Expose } from "class-transformer";

export class FrameRequestBody{
    @IsDefined()
    @Expose()
    @IsNotEmpty()
    name!:string


    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUrl()
    link!:string

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    categoryId!:string


}