import { IsBoolean, IsEmail, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email:string

    @IsString()
    lastName: string;

    @IsString()
    birth_day: string;

    @IsString()
    document: string;

    @IsString()
    address: string;

    @IsBoolean()
    subscriber: boolean;
  }