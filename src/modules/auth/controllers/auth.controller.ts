import { Request, Router,Response } from "express";
import { LoginRequestBody } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { HttpError } from "../../../utility/error/http_error";
import { validationMiddleware } from "../../../utility/middleware/validation.middleware";
import { respond, ResponseCode} from "../../../utility/response/response";

export class AuthController {
    public router: Router;
    public userService:UserService;
    public authService:AuthService;

    constructor() {
    this.router = Router();
    this.routes();
    this.authService = new AuthService();
    this.userService = new UserService();
    }


    private login = async(req:Request,res:Response)=>{
        const {email,password} = res.locals.input as LoginRequestBody
        const user = await this.userService.getUser({email:email.toLowerCase()});

        if(!user){
            throw new HttpError("invalid login",ResponseCode.BAD_REQUEST);
        }

        const isPasswordCorrect = await this.authService.validatePassword(email,password)
        if(!isPasswordCorrect){
            throw new HttpError("Password Invalid",ResponseCode.BAD_REQUEST)
        }
        
        const jwtToken = await this.authService.generateJwtToken(user)

        respond(res,jwtToken);
    }


    private routes(){
        this.router.post("/login",validationMiddleware(LoginRequestBody),this.login)
    }
}  