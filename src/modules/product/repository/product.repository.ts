import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from 'src/modules/product-stock/entities/stock.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product, typeProduct } from '../entities/product.entity';
import ProductRepositoryInterface from '../interface/ProductRepositoryInterface';

@Injectable()
export default class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}
  async create(createProduct: CreateProductDto): Promise<Product> {
    try {
      const dataCreateStock = {
        amount: createProduct.stock.amount,
        dateValidate: this.convertData(createProduct.stock.dateValidate),
        price: createProduct.stock.price,
      };
      const createStock = await this.stockRepository.create(dataCreateStock);

      await this.stockRepository.save(createStock);

      const typeProduct = await this.searchTypeProduct(createProduct.type[0]);

      if (!typeProduct) {
        throw new Error('Tipo de produto nao encontrado');
      }
      let createProductSerialize = {
        description: createProduct.description,
        typeProduct: typeProduct,
        stock: createStock,
      };
      const createdProduct = await this.productRepository.create(
        createProductSerialize,
      );
      await this.productRepository.save(createdProduct);

      return createdProduct;
    } catch (error) {
      throw Error(error);
    }
  }

  async searchTypeProduct(level: string): Promise<typeProduct | void> {
    switch (level) {
      case 'drinks':
        return typeProduct.DRINKS;
      case 'electronic':
        return typeProduct.ELETRONIC;
      case 'fresh':
        return typeProduct.FRESH;
      case 'processed':
        return typeProduct.PROCESSED;
      case 'toy':
        return typeProduct.TOY;
      default:
        return null;
    }
  }

  convertData(data: string): Date {
    const dateSplit = data.split('/');
    const dataFormtada = dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2];
    const stringDateToDate = new Date(dataFormtada);

    return stringDateToDate;
  }
}
