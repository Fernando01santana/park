import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum acessLevel{
    client,
    maganer,
    employeer,
    admin,
}
@Entity("Users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  birth_day: Date;

  @Column()
  document: string;

  @Column()
  address: string;

  @Column()
  subscriber: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}