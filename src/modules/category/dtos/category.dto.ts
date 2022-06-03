import {  IsDefined,IsNotEmpty, Length,IsUrl, IsLowercase } from "class-validator";
import {  Expose } from "class-transformer";

export class CategoryRequestBody{
    @IsDefined()
    @Expose()
    @IsNotEmpty()
    name!:string


    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsLowercase()
    alias!:string


    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUrl()
    thumbnailLink!: string

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @Length(0,120)
    description!:string
}