import { IsArray, IsObject, IsString } from 'class-validator';
import { CreateStockDto } from 'src/modules/product-stock/dto/createStock.dto';

export class UpdateProductDto {
  @IsString()
  description: string;

  @IsArray()
  type: string[];

  @IsObject()
  stock: CreateStockDto;

  @IsString()
  barCode: string;

  @IsString()
  idStock: string;
}
