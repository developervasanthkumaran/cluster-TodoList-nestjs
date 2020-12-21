import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UsersService,
                private readonly jwtService:JwtService){
    }
    async validateUserWithNameAndPassWord(username:string,password:string):Promise<any>{
        const user =  await this.userService.findOneWithNameAndPassWord(username,password);
        // console.log('user..', user);
        return user?{username:user.username,sub:user.user_id}:null;
    }

    async validateUserWithName(username:string):Promise<boolean>{
        return false;
    }

    async issueTokenAndLogIn(user:any){
        const payload = { username: user.username, sub: user.sub};
        // console.log(payload);
        return {
            access_token:this.jwtService.sign(payload)
        };
    }
}
