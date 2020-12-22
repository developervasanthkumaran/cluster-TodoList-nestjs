import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, userschema} from '../users/schemas/user.schema'
import { TodoList, todolistschema } from '../users/schemas/todolist.schema'
import { MainTask, maintaskschema } from '../users/schemas/maintask.schema'
import { SubTask, subtaskschema } from '../users/schemas/subtask.schema'
import { UserTodoListService } from './userstodolist.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name:User.name,schema:userschema},
    {name:TodoList.name,schema:todolistschema},
    {name:MainTask.name,schema:maintaskschema},
    {name:SubTask.name,schema:subtaskschema}
  ])],
  controllers: [UsersController],
  providers: [UsersService,UserTodoListService],
  exports:[UsersService]
})
export class UsersModule {}
