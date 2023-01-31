import { Lots } from 'src/modules/lots/entities/lot.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  price: number;

  @OneToOne(() => Lots)
  @JoinColumn({ name: 'lotId' })
  lot: Lots;

  @OneToMany(() => Product, (product) => product.stock)
  products: Product[];

  @Column()
  dateValidate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
