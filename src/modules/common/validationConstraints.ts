import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { validate} from 'uuid';

@ValidatorConstraint()
export class IsUUIDArray implements ValidatorConstraintInterface {

    public async validate(uuidData: string[], args: ValidationArguments): Promise<boolean>{
        const isArray = Array.isArray(uuidData);
        
        const isAllUuid = uuidData.every((id)=>{
            return validate(id)
        })
        return isArray && isAllUuid;
    }
}