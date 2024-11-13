import { Module } from '@nestjs/common';
import { StartegyService } from './startegy.service';

@Module({
  controllers: [],
  providers: [StartegyService],
  exports: [StartegyService],
})
export class StartegyModule {}
