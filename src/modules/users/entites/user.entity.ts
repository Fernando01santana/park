import { Address } from 'src/modules/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum acessLevel {
  client = 'client',
  manager = 'manager',
  employeer = 'employeer',
  admin = 'admin',
}
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  lastName: string;

  @Column()
  birthDay: Date;

  @Column()
  document: string;

  @Column()
  subscriber: boolean;

  @Column('int')
  acessLevel: acessLevel;

  @ManyToOne((type) => Address, (address) => address.user, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
