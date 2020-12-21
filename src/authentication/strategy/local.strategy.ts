import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super();
    }
    async validate(username:string,password:string):Promise<any>{
        const user_payload = await this.authService.validateUserWithNameAndPassWord(username,password);
        return user_payload?user_payload:null;
    }

}