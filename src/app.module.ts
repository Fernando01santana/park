import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/datasource/typeOrmModule';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule, UsersModule, AuthModule],
})
export class AppModule {}
