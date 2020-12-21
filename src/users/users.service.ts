import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userdocument,User } from '../users/schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usermodel:Model<userdocument>){}

  async create(createUserDto: CreateUserDto):Promise<boolean> {
    const newUser  = new this.usermodel(createUserDto);
    newUser.user_id = newUser.id;
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
}
