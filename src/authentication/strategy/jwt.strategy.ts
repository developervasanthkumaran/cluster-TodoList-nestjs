import { Injectable } from '@nestjs/common'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConstant } from '../constants/constant';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
        constructor(){
            super({  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    ignoreExpiration: false,
                    secretOrKey: jwtConstant.secret,
                });
        }
         async validate(payload:any){
             console.log('called validate ',payload);
            return {username:payload.username,user_id:payload.sub};
        }
}