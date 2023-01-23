import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum acessLevel {
  client,
  manager,
  employeer,
  admin,
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

  @Column({
    type: 'enum',
    enum: acessLevel,
    default: acessLevel.client,
  })
  acessLevel: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
