import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";

config()
const connectionTypeOrm =  TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: String(process.env.PASSWORD),
      database: process.env.DATABASE,
      entities: [],
      synchronize: true,
    })

export default connectionTypeOrm