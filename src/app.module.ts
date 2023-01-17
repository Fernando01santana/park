import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import connectionTypeOrm from './config/connection';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    connectionTypeOrm,
    UsersModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
