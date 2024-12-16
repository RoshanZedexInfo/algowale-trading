import { Module } from '@nestjs/common';
import { QueueModule } from 'src/queue/queue.module';
import { TradingBotController } from './trading-bots.controller';

@Module({
  imports: [QueueModule],
  controllers: [TradingBotController],
})
export class TradingBotModule {}
