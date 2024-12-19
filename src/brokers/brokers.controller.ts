import { Controller } from '@nestjs/common';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';
import { BrokersService } from './brokers.service';

@Controller('brokers')
@IsAdmin()
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}
}
