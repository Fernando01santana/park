import { config } from 'dotenv';
import { Address } from 'src/modules/address/entities/address.entity';
import { Users } from 'src/modules/users/entites/user.entity';
import { DataSource } from 'typeorm';

config();
export const dataSourceConfig = new DataSource({
  type: 'postgres',
  host: process.env.RDS_HOST,
  port: parseInt(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: String(process.env.RDS_PASSWORD),
  database: process.env.RDS_DATABASE,
  entities: [Users, Address],
  migrations: ['dist/shared/migrations/*.js'],
  synchronize: false,
});