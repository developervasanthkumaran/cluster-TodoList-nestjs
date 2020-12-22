import {Schema,Prop, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { SubTask } from './subtask.schema'

export type maintaskDocument  = MainTask & Document

@Schema()
export class MainTask extends Document{

    @Prop({unique:true,required:true})
    m_id:string

    @Prop({required:true})
    name:string

    @Prop({required:true})
    isCompleted:boolean

    @Prop()
    subtask:SubTask[]
}

export const maintaskschema = SchemaFactory.createForClass(MainTask)