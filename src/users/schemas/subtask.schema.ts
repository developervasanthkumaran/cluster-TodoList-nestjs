import {Schema,Prop, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type subtaskDocument  = Document & SubTask

@Schema()
export class SubTask extends Document{

    @Prop({unique:true,required:true})
    s_id:string
    
    @Prop({required:true})
    name:string

    @Prop({required:true})
    isCompleted:boolean
}

export const subtaskschema  = SchemaFactory.createForClass(SubTask);