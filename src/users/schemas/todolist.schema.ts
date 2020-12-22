import {Schema,Prop, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { MainTask } from './maintask.schema'

export type todolistDocument  = Document & TodoList

@Schema()
export class TodoList extends Document{

    @Prop({})
    maintask:MainTask[]
}

export const todolistschema = SchemaFactory.createForClass(TodoList)