import {
  Column,
  CreateDateColumn,
  Entity,
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
  address: string;

  @Column()
  subscriber: boolean;

  @Column('int')
  acessLevel: acessLevel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
