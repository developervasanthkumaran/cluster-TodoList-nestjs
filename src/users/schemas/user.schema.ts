import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { TodoList } from './todolist.schema';

export type userdocument = User & Document;

@Schema()
export class User extends Document{
    
    @Prop({unique:true,index:true,required:true})
    user_id:string

    @Prop({unique:true, required:true})
    username:string

    @Prop({unique:true, required:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop()
    todolist:TodoList
}

export const userschema = SchemaFactory.createForClass(User);

