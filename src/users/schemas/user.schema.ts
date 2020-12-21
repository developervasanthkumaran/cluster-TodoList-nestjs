import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type userdocument = User& Document;

@Schema()
export class User{
    
    @Prop({unique:true,index:true,required:true})
    user_id:string

    @Prop({unique:true, required:true})
    username:string

    @Prop({unique:true, required:true})
    email:string

    @Prop({required:true})
    password:string
}

export const userschema = SchemaFactory.createForClass(User);

