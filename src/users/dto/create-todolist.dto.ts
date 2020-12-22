import { TodoList } from "../schemas/todolist.schema";
import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoListDto{
    @ApiProperty()
    private readonly todolist:TodoList
}