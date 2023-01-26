import { Address } from 'src/modules/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => Address, (address) => address.user, { eager: true })
  address: Address[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
