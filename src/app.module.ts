import { Module } from '@nestjs/common';
import { TypeOrmModule } from './config/typeOrmModule';
import { AddressModule } from './modules/address/address.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AddressModule, TypeOrmModule, UsersModule],
})
export class AppModule {}
