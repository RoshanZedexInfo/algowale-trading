import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'bullmq';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AlpacaController } from './alpaca/alpaca.controller';
import { AlpacaModule } from './alpaca/alpaca.module';
import { AlpacaService } from './alpaca/alpaca.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import alpacaConfig from './configs/alpaca.config';
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import redisConfig from './configs/redis.config';
import { TypeOrmService } from './database/typeorm.service';
import { StartegyModule } from './startegy/startegy.module';
import { StartegyService } from './startegy/startegy.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, alpacaConfig],
    }),
    BullModule.forRoot({
      connection: redisConfig as ConnectionOptions,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AlpacaModule,
    StartegyModule,
  ],
  controllers: [AppController, AlpacaController],
  providers: [AppService, AlpacaService, StartegyService],
})
export class AppModule {}
