import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utils } from 'src/shared/utils/utils';
import { Lots } from '../lots/entities/lot.entity';
import { Stock } from '../product-stock/entities/stock.entity';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import ProductRepository from './repository/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock, Lots])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, Utils],
  exports: [ProductService],
})
export class ProductModule {}
