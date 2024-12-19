import { Controller } from '@nestjs/common';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

@Controller('strategies')
@IsAdmin()
export class StrategiesController {}
