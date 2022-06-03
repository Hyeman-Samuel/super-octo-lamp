import {  IsDefined,IsNotEmpty,IsNumber} from "class-validator";
import {  Expose } from "class-transformer";

export class AddPackageToPlatformRequestBody{

    @IsDefined()
    @Expose()
    @IsNumber({maxDecimalPlaces:2})
    price!:number


}

export class PlatformRequestBody{

    @IsDefined()
    @Expose()
    @IsNotEmpty()
    price!:number


}
