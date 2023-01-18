import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/typeOrmModule';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule,
    UsersModule],
})
export class AppModule {}
