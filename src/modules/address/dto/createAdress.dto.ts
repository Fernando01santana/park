import { IsString } from 'class-validator';

export class createAddress {
  @IsString()
  street: string;

  @IsString()
  district: string;

  @IsString()
  zipCode: string;

  @IsString()
  numberHouse: string;

  @IsString()
  complement: string;
}
