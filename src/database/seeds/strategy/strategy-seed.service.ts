import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'src/strategies/entities/strategy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StrategySeedService {
  constructor(
    @InjectRepository(Strategy)
    private readonly respository: Repository<Strategy>,
  ) {}

  async run() {
    const strategies = {
      open_low: {
        name: 'Open Low',
        description: 'Open Low',
      },
      open_high: {
        name: 'Open High',
        description: 'Open High',
      },
    };

    const count = await this.respository.count();

    if (!count) {
      for (const key in strategies) {
        if (Object.prototype.hasOwnProperty.call(strategies, key)) {
          const strategy: Strategy = {
            name: strategies[key].name,
            slug: key,
            description: strategies[key].description,
          } as Strategy;
          await this.respository.save(strategy);
        }
      }
    }
  }
}
