import { Body, Controller, Get, Param, Post, Req, UseGuards,Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @ApiBody({})
    @ApiBearerAuth('local')
    @Post('/login')
    async loggedIn(@Request() populated_req:any):Promise<any>{
        // console.log('after guard.. ',populated_req);
        return await this.authService.issueTokenAndLogIn(populated_req.user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('jwt')
    @Get('/profile')    
    async getProfile(@Request() validated_token:any):Promise<any>{
        console.log('user validation');
        return  validated_token.user;
    }
}

   


