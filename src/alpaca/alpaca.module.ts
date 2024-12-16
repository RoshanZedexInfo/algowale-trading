import { Module } from '@nestjs/common';
import { StartegyModule } from 'src/strategies/strategies.module';
import { AlpacaController } from './alpaca.controller';
import { AlpacaService } from './alpaca.service';

@Module({
  imports: [StartegyModule],
  controllers: [AlpacaController],
  providers: [AlpacaService],
  exports: [AlpacaService],
})
export class AlpacaModule {}
