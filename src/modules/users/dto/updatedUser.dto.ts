import { IsBoolean, IsString } from "class-validator"

export class updateUser{
    @IsString()
    name:string

    @IsString()
    lastName:string

    @IsString()
    birthDay:string

    @IsString()
    address:string

    @IsBoolean()
    subscriber:boolean
}
