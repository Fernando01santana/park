import { TypeOrmModule } from "@nestjs/typeorm";

const connectionTypeOrm =  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    })

export default connectionTypeOrm