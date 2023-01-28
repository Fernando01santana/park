import { Stock } from 'src/modules/product-stock/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum typeProduct {
  FRESH = 'FRESH',
  PROCESSED = 'PROCESSED',
  DRINKS = 'DRINKS',
  ELETRONIC = 'ELETRONIC',
  TOY = 'TOY',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('int')
  typeProduct: typeProduct;

  @OneToOne(() => Stock)
  @JoinColumn()
  stock: Stock;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
