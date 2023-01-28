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
  fresh = 'fresh',
  processed = 'processed',
  drinks = 'drinks',
  electronic = 'electronic',
  toy = 'toy',
}

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('int')
  type: typeProduct;

  @OneToOne(() => Stock)
  @JoinColumn()
  stock: Stock;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
