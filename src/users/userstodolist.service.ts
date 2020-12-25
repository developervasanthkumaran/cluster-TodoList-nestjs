import { Injectable } from '@nestjs/common'
import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MainTask, maintaskDocument, maintaskschema } from './schemas/maintask.schema';
import { SubTask, subtaskDocument } from './schemas/subtask.schema';
import { TodoList, todolistDocument } from './schemas/todolist.schema';
import { User, userdocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateMainTaskDto } from './dto/create-maintask.dto';
import { CreateSubTaskDto } from './dto/create-subtask.dto';

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
                newMaintask.taskPosition  = user.todolist.maintask.length + 1
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
            if(updatedmaintaskDto.isCompleted){
                updatedTodoList.maintask.sort((a,b)=>{
                    let i1 =a.isCompleted?1:0;
                    let i2=b.isCompleted?1:0; 
                    return i1-i2;
                });
            }
            else{
                updatedTodoList.maintask.sort((a,b)=>{
                    return  a.taskPosition-b.taskPosition;
                });
            }
        
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
            updatedTodoList.maintask.forEach(item=>{if(item.m_id === m_id){
                newSubtask.taskPosition = item.subtask.length + 1
                item.subtask.push(newSubtask)
            }})
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
                    if(updatedsubtaskDto.isCompleted){
                        obj.subtask.sort((a,b)=>{
                            let i1 =a.isCompleted?1:0;
                            let i2=b.isCompleted?1:0; 
                            return i1-i2;
                        });
                    }
                    else{
                        obj.subtask.sort((a,b)=>{
                            return a.taskPosition-b.taskPosition;
                        });
                    }
                    
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

                if(updatedTodoList.maintask.length > 0)
                updatedTodoList.maintask.map(item=>item.taskPosition = item.taskPosition - 1)

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
                    
                    if(obj.subtask.length > 0)
                    obj.subtask.map(item=>item.taskPosition = item.taskPosition - 1)
                }
            });
            const updateUser =  await this.usersservice.update(user_id,{todolist:updatedTodoList});
            return updateUser?true:false;
        }
        return false;
    }
  

}