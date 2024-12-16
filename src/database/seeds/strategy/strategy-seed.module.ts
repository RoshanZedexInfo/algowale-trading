import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from 'src/strategies/entities/strategy.entity';
import { StrategySeedService } from './strategy-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
  providers: [StrategySeedService],
  exports: [StrategySeedService],
})
export class StrategySeedModule {}
