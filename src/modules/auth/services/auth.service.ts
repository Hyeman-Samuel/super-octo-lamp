import { sign, SignOptions } from "jsonwebtoken";
import { JwtTokenObject } from "../dtos/auth.dto";
import { UserEntity } from "../entities/user.entity";

export class AuthService {

    public validatePassword = async (email:string,password:string):Promise<boolean>=>{
        return true;
    }

    public generateJwtToken = async (user:UserEntity) : Promise<JwtTokenObject>=>{
        const jwtOptions ={
            expiresIn:60*10,
            issuer:"filtar",
            audience:"user",
            subject:"login"
    } as SignOptions
        const jwtPayload = {
            fullName:`${user.firstname} ${user.lastname}`,
            userId:user.id,
            Role:user.role
    }
        const jsonToken = sign(jwtPayload, "key", jwtOptions);
        const token = new JwtTokenObject();
        token.accessToken = jsonToken;
        token.durationValidForInMinutes = 10;
        return token;
    }

}