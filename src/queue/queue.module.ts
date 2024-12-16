import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TradeBotListener } from 'src/trading-bots/listeners/trade-bot.listener';
import { TradeBotProcessor } from 'src/trading-bots/processors/trade-bot.processor';
import { TARDE_BOT } from './queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: TARDE_BOT,
    }),
    BullBoardModule.forFeature({
      name: TARDE_BOT,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [],
  providers: [TradeBotListener, TradeBotProcessor],
  exports: [BullModule],
})
export class QueueModule {}
