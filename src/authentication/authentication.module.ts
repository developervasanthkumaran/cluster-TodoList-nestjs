import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { jwtConstant } from './constants/constant';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:[UsersModule,PassportModule,JwtModule.register({
    secret:jwtConstant.secret,
    signOptions:{expiresIn:3600}
})],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthenticationModule {}
