import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, userschema} from '../users/schemas/user.schema'

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:userschema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
