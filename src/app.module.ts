import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlpacaController } from './alpaca/alpaca.controller';
import { AlpacaModule } from './alpaca/alpaca.module';
import { AlpacaService } from './alpaca/alpaca.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { alpacaConfig } from './configs/alpaca.config';
import config from './configs/config';
import { StartegyModule } from './startegy/startegy.module';
import { StartegyService } from './startegy/startegy.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, alpacaConfig],
    }),
    AlpacaModule,
    StartegyModule,
  ],
  controllers: [AppController, AlpacaController],
  providers: [AppService, AlpacaService, StartegyService],
})
export class AppModule {}
