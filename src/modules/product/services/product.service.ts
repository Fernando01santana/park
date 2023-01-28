import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product } from '../entities/product.entity';
import ProductRepository from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProduct: CreateProductDto): Promise<Product> {
    return this.productRepository.create(createProduct);
  }
}
