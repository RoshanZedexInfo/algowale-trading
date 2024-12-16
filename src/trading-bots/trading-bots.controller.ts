import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Post, Query } from '@nestjs/common';
import { Queue } from 'bullmq';
import { TARDE_BOT } from 'src/queue/queue.constants';

@Controller({
  path: 'trading-bot',
  version: '1',
})
export class TradingBotController {
  constructor(
    @InjectQueue(TARDE_BOT)
    private readonly tradeBotQueue: Queue,
  ) {}

  @Post()
  async create(@Query('symbol') symbol: string): Promise<string> {
    await this.tradeBotQueue.add(
      symbol,
      { symbol },
      {
        repeat: {
          every: 5000, // Every 1 second
        },
        delay: 1000,
        attempts: 3,
        removeOnComplete: {
          count: 20,
        },
        removeOnFail: true,
      },
    );
    return 'Trade bot job created';
  }

  @Post('stop')
  async stop(): Promise<string> {
    await this.tradeBotQueue.pause();
    return 'Trade bot job paused';
  }

  //clear all jobs
  @Post('clear')
  async clear(): Promise<string> {
    await this.tradeBotQueue.obliterate();
    return 'Trade bot job cleared';
  }
}
