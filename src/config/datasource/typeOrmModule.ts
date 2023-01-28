import { Global, Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './dataSourceConfig';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSourceConfig.initialize();
        Logger.log('DATABASE ON');
        return dataSourceConfig;
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
