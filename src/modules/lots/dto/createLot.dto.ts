import { IsNumber, IsString } from 'class-validator';

export class CreateLotDto {
  @IsNumber()
  numberLot: number;

  @IsString()
  dateValidate: string;

  @IsString()
  dateFabrication: string;

  @IsNumber()
  qtdeItems: number;
}
