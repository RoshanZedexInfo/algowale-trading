import {
  InjectQueue,
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { TARDE_BOT } from 'src/queue/queue.constants';

@QueueEventsListener(TARDE_BOT)
export class TradeBotListener extends QueueEventsHost {
  private readonly logger = new Logger(TradeBotListener.name);

  constructor(@InjectQueue(TARDE_BOT) private readonly tradeBotQueue: Queue) {
    super();
  }

  @OnQueueEvent('active')
  onActive(job: Job) {
    console.log(`Job ${job.id} active`);
  }

  @OnQueueEvent('waiting')
  onWaiting(job: Job) {
    console.log(`Job ${job.id} waiting`);
  }

  @OnQueueEvent('delayed')
  onDelayed(job: Job) {
    console.log(`Job ${job.id} delayed`);
  }

  @OnQueueEvent('completed')
  onCompleted(job: Job, result: any) {
    console.log(`Job ${job.id} completed with result ${result}`);
  }
}
