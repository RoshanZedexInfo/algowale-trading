import { Module } from '@nestjs/common';
import { BrokerAuthsService } from './broker-auths.service';
import { BrokerAuthsController } from './broker-auths.controller';

@Module({
  controllers: [BrokerAuthsController],
  providers: [BrokerAuthsService],
})
export class BrokerAuthsModule {}
