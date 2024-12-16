import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { TARDE_BOT } from 'src/queue/queue.constants';

@Processor(TARDE_BOT)
export class TradeBotProcessor extends WorkerHost {
  private readonly logger = new Logger(TradeBotProcessor.name);
  constructor() {
    super();
  }

  async process(job: Job) {
    await this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.symbol}`,
    );
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.symbol}`,
    );
    await job.isActive();
    await job.isWaiting();
    await job.isCompleted();
    return `Processing job ${job.id} of type ${job.name} with data ${job.data.symbol}`;
  }
}
