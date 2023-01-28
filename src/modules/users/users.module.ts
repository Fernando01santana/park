import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtValidateMiddleware } from 'src/shared/middlewares/jwt.middleware';
import { DocumentValidateMiddleware } from 'src/shared/middlewares/user.middleware';
import { Address } from '../address/entities/address.entity';
import { AppController } from './controller/users.controller';
import { Users } from './entites/user.entity';
import UserRepository from './repositorie/user.repository';
import { UserService } from './services/users.service';
@Module({
  imports: [TypeOrmModule.forFeature([Users, Address])],
  controllers: [AppController],
  providers: [
    UserService,
    UserRepository,
    DocumentValidateMiddleware,
    JwtService,
  ],
  exports: [UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidateMiddleware).forRoutes('user');
  }
}
