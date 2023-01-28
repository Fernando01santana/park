import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as bodyParser from 'body-parser';
import { DocumentValidateMiddleware } from 'src/shared/middlewares/userMiddleware';
import { Address } from '../address/entities/address.entity';
import { AppController } from './controller/users.controller';
import { Users } from './entites/user.entity';
import UserRepository from './repositorie/user.repository';
import { UserService } from './services/users.service';
@Module({
  imports: [TypeOrmModule.forFeature([Users, Address])],
  controllers: [AppController],
  providers: [UserService, UserRepository, DocumentValidateMiddleware],
  exports: [UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(bodyParser.json(), DocumentValidateMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
