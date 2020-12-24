import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTodoListService } from './userstodolist.service';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { CreateMainTaskDto } from './dto/create-maintask.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly userstodolistService:UserTodoListService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('todolist/:user_id')
  getTodoList(@Param('user_id') user_id:string){
      return this.usersService.getTodoList(user_id);
  }

  @Post('todolist/maintask/:user_id')
  addMainTask(@Param('user_id') user_id:string,@Body() createMainTaskDto:CreateMainTaskDto){
    console.log('userid ', user_id);
    return this.userstodolistService.addMainTask(user_id,createMainTaskDto);
  }

  @Post('todolist/subtask/:user_id/:m_id')
  addSubTask(@Param('user_id') user_id:string,@Param('m_id') m_id:string,@Body() createSubTaskDto:CreateSubTaskDto){
    return this.userstodolistService.addSubTask(user_id,m_id,createSubTaskDto);
  }

  @Put('todolist/maintask/:user_id/:m_id')
  updateMainTask(@Param('user_id') user_id:string,@Param('m_id') m_id:string,@Body() payload:any){
    return this.userstodolistService.updateMainTask(user_id,m_id,payload);
  }

  @Put('todolist/subtask/:user_id/:m_id/:s_id')
  updateSubTask(@Param('user_id') user_id:string,@Param('m_id') m_id:string,@Param('s_id') s_id:string,@Body() payload:any){
    return this.userstodolistService.updateSubTask(user_id,m_id,s_id,payload);
  }

  @Delete('todolist/maintask/:user_id/:m_id')
  deleteMainTask(@Param('user_id') user_id:string,@Param('m_id') m_id:string){
    return this.userstodolistService.deleteMainTask(user_id,m_id);
  }

  @Delete('todolist/subtask/:user_id/:m_id/:s_id')
  deleteSubTask(@Param('user_id') user_id:string,@Param('m_id') m_id:string,@Param('s_id') s_id:string){
    return this.userstodolistService.deleteSubTask(user_id,m_id,s_id);
  }

}
