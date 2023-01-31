import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from 'src/modules/product-stock/entities/stock.entity';
import {
  ProductNotFount,
  TypeProductNotFound,
} from 'src/shared/exceptions/product.exception';
import { StockNotFount } from 'src/shared/exceptions/stock.exception';
import { Utils } from 'src/shared/utils/utils';
import { Repository } from 'typeorm';
import { UpdateProductDto } from '../dto/updateproduct.dto';
import { Product } from '../entities/product.entity';
import ProductRepositoryInterface from '../interface/ProductRepositoryInterface';
@Injectable()
export default class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private utils: Utils,
  ) {}
  async create(createProduct): Promise<Product> {
    try {
      const dataProduct = {
        description: createProduct.description,
        stock: createProduct.stock,
        typeProduct: createProduct.type,
        barCode: createProduct.barCode,
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

  findByDateValidate(dateValidade: string): Promise<Product[]> {
    const dateValidate = this.utils.convertData(dateValidade);
    return this.productRepository
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

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new ProductNotFount();
    }

    await this.productRepository.delete(product);
    return;
  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new ProductNotFount();
    }

    const typeUpdate = await this.utils.searchTypeProduct(
      updateProduct.type[0],
    );
    if (!typeUpdate) {
      throw new TypeProductNotFound();
    }

    const updateStockproduct = await this.stockRepository.findOne({
      where: { id: updateProduct.idStock },
    });
    if (!updateStockproduct) {
      throw new StockNotFount();
    }

    for (const key in updateProduct.stock) {
      if (updateProduct.stock.hasOwnProperty.call(updateStockproduct, key)) {
        updateStockproduct[key] = updateProduct.stock[key];
      }
    }
    await this.stockRepository.save(updateStockproduct);

    product.barCode = updateProduct.barCode;
    product.typeProduct = typeUpdate;
    product.description = updateProduct.description;
    product.stock = updateStockproduct;

    this.productRepository.save(product);
    return product;
  }
}
