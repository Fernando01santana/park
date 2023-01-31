import { Stock } from 'src/modules/product-stock/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne((type) => Stock, (stock) => stock.products, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'stockId' })
  stock: Stock;

  @Column()
  barCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
