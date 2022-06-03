import {  IsDefined,IsNotEmpty,Length,IsArray, IsLowercase } from "class-validator";
import {  Expose } from "class-transformer";

export class PackageRequestBody{
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
    @Length(0,120)
    description!:string

    
    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsArray()
    infographicVideos!:string[]
}