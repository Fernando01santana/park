import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('/create')
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.create(data);
  }
}
