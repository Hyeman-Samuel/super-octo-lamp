import {  IsDefined,IsEmail,IsNotEmpty, Matches} from "class-validator";
import {  Expose } from "class-transformer";

export class LoginRequestBody{
    @IsDefined()
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email!:string


    @IsDefined()
    @Expose()
    @IsNotEmpty()
    password!:string
}


export class JwtTokenObject{

    accessToken!:string
    durationValidForInMinutes!:number
}