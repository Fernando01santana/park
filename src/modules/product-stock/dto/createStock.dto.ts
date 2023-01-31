import { IsNumber, IsObject, IsString } from 'class-validator';
import { CreateLotDto } from 'src/modules/lots/dto/createLot.dto';

export class CreateStockDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  price: number;

  @IsString()
  dateValidate: string;

  @IsObject()
  lot: CreateLotDto;
}
