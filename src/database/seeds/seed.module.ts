import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/configs/app.config';
import databaseConfig from 'src/configs/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmService } from '../typeorm.service';
import { BrokerSeedModule } from './broker/broker-seed.module';
import { StrategySeedModule } from './strategy/strategy-seed.module';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [
    UserSeedModule,
    StrategySeedModule,
    BrokerSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
