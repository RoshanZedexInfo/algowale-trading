import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Broker } from 'src/brokers/entities/broker.entity';
import { Repository } from 'typeorm';
import { SeedInterface } from '../seed.interface';

@Injectable()
export class BrokerSeedService implements SeedInterface {
  constructor(
    @InjectRepository(Broker)
    private readonly respository: Repository<Broker>,
  ) {}

  async run() {
    const brokers = {
      zerodha: {
        name: 'Zerodha',
        slug: 'zerodha',
      },
      angel_one: {
        name: 'Angel One',
        slug: 'angel_one',
      },
    };

    const count = await this.respository.count();

    if (!count) {
      for (const key in brokers) {
        if (Object.prototype.hasOwnProperty.call(brokers, key)) {
          const broker: Broker = {
            name: brokers[key].name,
            slug: brokers[key].slug,
          } as Broker;
          await this.respository.save(broker);
        }
      }
    }
  }
}
