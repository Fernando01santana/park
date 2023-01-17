import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum acessLevel{
    client,
    maganer,
    employeer,
    admin,
}
@Entity()
export class User {
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

  @Column('int')
  acess_type: acessLevel;

  @Column()
  subscriber: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}