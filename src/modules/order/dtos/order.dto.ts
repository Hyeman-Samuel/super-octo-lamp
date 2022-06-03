import {  IsDefined,IsNotEmpty, Length,IsUrl,IsUUID, IsArray, ArrayMinSize, Matches,Validate, IsOptional, IsEmail, IsPhoneNumber} from "class-validator";
import {  Expose } from "class-transformer";
import { IsUUIDArray } from "../../common/validationConstraints";
import { OrderDetailEntity } from "../orderdetails/entities/orderdetail.entity";


export class CreateOrderRequestBody{
    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    packageId!:string

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    categoryId!:string

    @IsDefined()
    @Expose()
    @IsArray()
    @ArrayMinSize(1)
    @Validate(IsUUIDArray, {
        message: "Enter valid uuid value for the platformIds",
    })
    platformIds!:string[]

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUrl()
    designImage!:string

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @Length(0,20)
    @Matches("#[\w$@\-]*","",{message:"Invalid Hashtag"})
    hashtag!:string


    @IsOptional()
    firstname!:string

    @IsOptional()
    lastname!:string 
    
    @IsEmail()
    @IsOptional()
    email!:string
    
    @IsOptional()
    @IsPhoneNumber("NG")    
    phonenumber!:string

}

export class FullfillOrderRequestBody{

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsUrl()
    redirectUrl!: string

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    orderReference!:string
}

export class OrderPreview{
    total!:number
    details!:OrderDetailEntity[]
}