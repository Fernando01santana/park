import { Module } from '@nestjs/common';
import { AppController } from './controller/users.controller';
import { AppService } from './services/users.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class UsersModule {}
