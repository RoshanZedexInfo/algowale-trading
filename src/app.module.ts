import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'bullmq';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AlpacaModule } from './alpaca/alpaca.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { BrokerAuthsModule } from './broker-auths/broker-auths.module';
import { BrokersModule } from './brokers/brokers.module';
import alpacaConfig from './configs/alpaca.config';
import appConfig from './configs/app.config';
import authConfig from './configs/auth.config';
import databaseConfig from './configs/database.config';
import redisConfig from './configs/redis.config';
import { TypeOrmService } from './database/typeorm.service';
import { OrdersModule } from './orders/orders.module';
import { QueueModule } from './queue/queue.module';
import { SessionModule } from './session/session.module';
import { StartegyModule } from './strategies/strategies.module';
import { TradingBotModule } from './trading-bots/trading-bots.module';
import { UsersModule } from './users/users.module';
import { UserContextInterceptorModule } from './utils/interceptors/user-context/user-context-interceptor.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig, redisConfig, alpacaConfig],
    }),
    // ScheduleModule.forRoot(),
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
    UsersModule,
    TradingBotModule,
    QueueModule,
    OrdersModule,
    AuthModule,
    SessionModule,
    UserContextInterceptorModule,
    BrokersModule,
    BrokerAuthsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
