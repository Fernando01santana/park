import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('/create')
  async create(@Body() data: CreateProductDto): Promise<Product> {
    const product = await this.productService.create(data);
    return product;
  }

  @Get('/list')
  async list(): Promise<Product[]> {
    return this.productService.list();
  }
}
