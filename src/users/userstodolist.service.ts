import { Injectable } from '@nestjs/common'
import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MainTask, maintaskDocument, maintaskschema } from './schemas/maintask.schema';
import { SubTask, subtaskDocument } from './schemas/subtask.schema';
import { TodoList, todolistDocument } from './schemas/todolist.schema';
import { CreateTodoListDto } from './dto/create-todolist.dto';
import { User, userdocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateMainTaskDto } from './dto/create-maintask.dto';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { HttpException } from '@nestjs/common';
import { UpdateMainTaskDto } from './dto/update-maintask.dto';

@Injectable()
export class UserTodoListService {
    constructor(
    @InjectModel(User.name)
    private readonly usermodel:Model<userdocument>,
    @InjectModel(TodoList.name)
    private readonly todolistmodel:Model<todolistDocument>,
    @InjectModel(MainTask.name)
    private readonly maintaskmodel:Model<maintaskDocument>,
    @InjectModel(SubTask.name)
    private readonly subtaskmodel:Model<subtaskDocument>,
    private readonly usersservice:UsersService
     ){}

    async addMainTask(user_id:string,maintaskDto:CreateMainTaskDto):Promise<boolean>{
            console.log(user_id);
            let user = await this.usersservice.findOne(user_id);
            if(user){
                let newMaintask  = new this.maintaskmodel(maintaskDto);
                console.log(newMaintask.id);
                newMaintask.m_id = newMaintask.id;
                let updatedTodoList = user.todolist;
                updatedTodoList.maintask.push(newMaintask);
                const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
                return updateUser?true:false;
            }
            return false;
    }

    async updateMainTask(user_id:string,m_id:string,updatedmaintaskDto:any):Promise<boolean>{
        console.log(user_id);
        let user = await this.usersservice.findOne(user_id);
        if(user){
            let updatedTodoList = user.todolist;
            updatedTodoList.maintask.forEach((obj)=>{
                if(obj.m_id === m_id) {
                    obj.name  = updatedmaintaskDto.name;
                    obj.isCompleted = updatedmaintaskDto.isCompleted;
                    obj.subtask = updatedmaintaskDto.subtask;
                }
            });
            const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
            return updateUser?true:false;
        }
        return false;
}

    async addSubTask(user_id:string,m_id:string,subtaskDto:CreateSubTaskDto):Promise<boolean>{
        let user = await this.usersservice.findOne(user_id);
        if(user){
            let newSubtask  = new this.subtaskmodel(subtaskDto);
            newSubtask.s_id = newSubtask.id;
            let updatedTodoList = user.todolist;
            updatedTodoList.maintask.forEach(item=>{if(item.m_id === m_id){item.subtask.push(newSubtask)}})
            const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
            return updateUser?true:false;
        }
    return false;
    }

    
    async updateSubTask(user_id:string,m_id:string,s_id:string,updatedsubtaskDto:any):Promise<boolean>{
        console.log(user_id);
        let user = await this.usersservice.findOne(user_id);
        if(user){
            let updatedTodoList = user.todolist;
            updatedTodoList.maintask.forEach((obj)=>{
                if(obj.m_id === m_id) {
                    obj.subtask.forEach((s)=>{
                        if(s.s_id === s_id){
                            s.name = updatedsubtaskDto.name;
                            s.isCompleted = updatedsubtaskDto.isCompleted;
                        }
                    });
                }
            });
            const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
            return updateUser?true:false;
        }
        return false;
}


    async deleteMainTask(user_id:string,m_id:string):Promise<boolean>{
        let user = await this.usersservice.findOne(user_id);
            if(user){
                let updatedTodoList = user.todolist;
                updatedTodoList.maintask = updatedTodoList.maintask.filter(item=>{return item.m_id!==m_id})
                const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
                return updateUser?true:false;
            }
            return false;
    }

    async deleteSubTask(user_id:string,m_id:string,s_id:string):Promise<boolean>{
        let user = await this.usersservice.findOne(user_id);
        if(user){
            let updatedTodoList = user.todolist;
            updatedTodoList.maintask.forEach((obj)=>{
                if(obj.m_id === m_id) {
                    obj.subtask = obj.subtask.filter((s)=>{return s.s_id!==s_id});
                }
            });
            const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
            return updateUser?true:false;
        }
        return false;
    }
  

}