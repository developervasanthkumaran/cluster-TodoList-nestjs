import { ApiProperty } from '@nestjs/swagger'

export class CreateSubTaskDto{

    @ApiProperty()
    private readonly s_id:string

    @ApiProperty()
    private readonly name:string

    @ApiProperty()
    private taskPosition:number

    @ApiProperty()
    private readonly isCompleted:boolean
}