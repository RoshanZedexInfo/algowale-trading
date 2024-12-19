import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broker } from 'src/brokers/entities/broker.entity';
import { BrokerSeedService } from './broker-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Broker])],
  providers: [BrokerSeedService],
  exports: [BrokerSeedService],
})
export class BrokerSeedModule {}
