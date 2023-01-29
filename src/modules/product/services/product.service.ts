import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from 'src/modules/product-stock/entities/stock.entity';
import {
  ProductExists,
  TypeProductNotFound,
} from 'src/shared/exceptions/product.exception';
import { Utils } from 'src/shared/utils/utils';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product } from '../entities/product.entity';
import ProductRepository from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectRepository(Stock)
    private readonly productStock: Repository<Stock>,
    private readonly utils: Utils,
  ) {}

  async create(createProduct: CreateProductDto): Promise<Product> {
    const typeProduct = await this.utils.searchTypeProduct(
      createProduct.type[0],
    );
    if (!typeProduct) {
      throw new TypeProductNotFound();
    }
    const productexist = await this.productRepository.findByName(
      createProduct.description,
    );

    if (productexist && productexist.id) {
      throw new ProductExists();
    }
    const dateValidate = this.utils.convertData(
      createProduct.stock.dateValidate,
    );

    const dataStock = {
      amount: createProduct.stock.amount,
      dateValidate: dateValidate,
      price: createProduct.stock.price,
    };
    const createStock = this.productStock.create(dataStock);
    await this.productStock.save(createStock);

    const dataProdut = {
      description: createProduct.description,
      stock: createStock,
      type: createProduct.type[0],
    };
    const productCreated = await this.productRepository.create(dataProdut);
    return productCreated;
  }

  async list(): Promise<Product[]> {
    return this.productRepository.list();
  }
}
