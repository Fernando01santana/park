import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controller/users.controller';
import { Users } from './entites/user.entity';
import UserRepository from './repositorie/userRepository';
import { UserService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AppController],
  providers: [UserService,UserRepository],
  exports:[]
})
export class UsersModule {}
