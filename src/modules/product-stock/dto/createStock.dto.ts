import { IsNumber, IsString } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  price: number;

  @IsString()
  dateValidate: string;
}
