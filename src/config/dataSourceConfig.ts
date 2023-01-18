import { Logger } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config()
const logger = new Logger
export const dataSourceConfig =  new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: String(process.env.PASSWORD),
      database: process.env.DATABASE,
      entities: [],
      migrations: ['dist/shared/migrations/*.js'],
      synchronize: true,
    })
