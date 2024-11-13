import { Test, TestingModule } from '@nestjs/testing';
import { StartegyService } from './startegy.service';

describe('StartegyService', () => {
  let service: StartegyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartegyService],
    }).compile();

    service = module.get<StartegyService>(StartegyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
