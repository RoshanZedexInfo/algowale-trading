import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strategy } from './entities/strategy.entity';
import { StrategiesController } from './strategies.controller';
import { StartegyService } from './strategies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Strategy])],
  controllers: [StrategiesController],
  providers: [StartegyService],
  exports: [StartegyService],
})
export class StartegyModule {}
