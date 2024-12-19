import { NestFactory } from '@nestjs/core';
import { BrokerSeedService } from './broker/broker-seed.service';
import { SeedModule } from './seed.module';
import { StrategySeedService } from './strategy/strategy-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run seed here
  await app.get(UserSeedService).run();
  await app.get(StrategySeedService).run();
  await app.get(BrokerSeedService).run();

  await app.close();
};

void runSeed();
