import { SubTask } from "../schemas/subtask.schema"
import { ApiProperty } from '@nestjs/swagger'

export class CreateMainTaskDto{

    @ApiProperty()
    private readonly m_id:string
    @ApiProperty()
    private readonly name:string
    @ApiProperty()
    private readonly isCompleted:boolean
    @ApiProperty()
    private taskPosition:number
    @ApiProperty()
    private readonly subtask:SubTask[]
}