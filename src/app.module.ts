import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/datasource/typeOrmModule';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule, UsersModule, AuthModule, ProductModule],
})
export class AppModule {}
