import { IsArray, IsObject, IsString } from 'class-validator';
import { CreateStockDto } from 'src/modules/product-stock/dto/createStock.dto';

export class CreateProductDto {
  @IsString()
  description: string;

  @IsArray()
  type: string[];

  @IsObject()
  stock: CreateStockDto;
}
