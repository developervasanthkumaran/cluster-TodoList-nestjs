import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userdocument,User } from '../users/schemas/user.schema'
import { UserTodoListService } from './userstodolist.service';
import { TodoList, todolistDocument } from './schemas/todolist.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usermodel:Model<userdocument>,
    @InjectModel(TodoList.name)
    private readonly todolistmodel:Model<todolistDocument>
    ){}

  async create(createUserDto: CreateUserDto):Promise<boolean> {
    let newUser  = new this.usermodel(createUserDto);
    newUser.user_id = newUser.id;
    newUser.todolist = new this.todolistmodel();
    const query =  await newUser.save().catch(err => {throw new HttpException('user already exists',400)})
    return query?true:false;
  }

 async findAll():Promise<User[]>{
    return await this.usermodel.find().catch(err=>{return err});
  }

  async findOne(id: string):Promise<User> {
    return await this.usermodel.findById(id).catch(err=>{return err});
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<boolean> {
    const query = await this.usermodel.findOneAndUpdate({user_id:id},updateUserDto).catch(err=>{return err});
    return query?true:false;
  }

  async remove(id: string):Promise<boolean> {
    const query =  await this.usermodel.findOneAndRemove({user_id:id}).catch(err=>{return err});
    return query?true:false;
  }

  async findOneWithNameAndPassWord(name:string,password:string):Promise<User>{
    const query = await this.usermodel.findOne({username:name,password:password});
    return query?query:null;
  }

  async getTodoList(user_id:string):Promise<TodoList>{
      const user = await this.usermodel.findOne({user_id:user_id})
      if(user){
        return user.todolist;
      }
      return null
  }


}
