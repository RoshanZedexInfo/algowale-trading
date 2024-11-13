import { Test, TestingModule } from '@nestjs/testing';
import { AlpacaController } from './alpaca.controller';

describe('AlpacaController', () => {
  let controller: AlpacaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlpacaController],
    }).compile();

    controller = module.get<AlpacaController>(AlpacaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
