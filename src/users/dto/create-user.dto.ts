import { ApiProperty } from '@nestjs/swagger'


export class CreateUserDto {
    @ApiProperty()
    private readonly username:string
    @ApiProperty()
    private readonly email:string
    @ApiProperty()
    private readonly password:string
}
