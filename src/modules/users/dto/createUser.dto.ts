import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsObject,
  IsString,
} from 'class-validator';
import { createAddress } from 'src/modules/address/dto/createAdress.dto';

export class createUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  lastName: string;

  @IsArray()
  acessLevel: string[];

  @IsString()
  birth_day: string;

  @IsString()
  document: string;

  @IsObject()
  address: createAddress;

  @IsBoolean()
  subscriber: boolean;
}
