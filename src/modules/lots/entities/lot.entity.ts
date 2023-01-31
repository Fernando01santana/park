import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lots')
export class Lots {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numberLot: number;

  @Column()
  dateValidate: Date;

  @Column()
  dateFabrication: Date;

  @Column()
  qtdeItems: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
