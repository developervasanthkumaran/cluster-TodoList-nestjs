import { ApiProperty } from '@nestjs/swagger'
import { TodoList } from '../schemas/todolist.schema'


export class CreateUserDto {
    @ApiProperty()
    private readonly username:string
    @ApiProperty()
    private readonly email:string
    @ApiProperty()
    private readonly password:string
    @ApiProperty()
    private readonly todolist:TodoList
}
