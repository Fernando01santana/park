import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from 'src/modules/product-stock/entities/stock.entity';
import { TypeProductNotFound } from 'src/shared/exceptions/product.exception';
import { Utils } from 'src/shared/utils/utils';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
@Injectable()
export default class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private utils: Utils,
  ) {}
  async create(createProduct): Promise<Product> {
    try {
      const typeProduct = await this.utils.searchTypeProduct(
        createProduct.type,
      );
      if (!typeProduct) {
        throw new TypeProductNotFound();
      }

      const dataProduct = {
        description: createProduct.description,
        stock: createProduct.stock,
        typeProduct: typeProduct,
      };
      const createdProduct = this.productRepository.create(dataProduct);
      await this.productRepository.save(createdProduct);

      return createdProduct;
    } catch (error) {
      throw Error(error);
    }
  }

  list(): Promise<Product[]> {
    return this.productRepository.find({ relations: { stock: true } });
  }

  findByName(descriptionProduct: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { description: descriptionProduct },
    });
  }

  async findByDateValidate(dateValidade: string): Promise<Product[]> {
    const dateValidate = this.utils.convertData(dateValidade);
    return await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.stock', 'itemStock')
      .where('itemStock.dateValidate', { dateValidate })
      .getMany();
  }
  async findByLot(lot: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.stock', 'itemStock')
      .where('itemStock.id', { lot })
      .getMany();
  }
}
