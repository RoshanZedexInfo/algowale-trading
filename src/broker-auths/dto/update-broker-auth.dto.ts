import { PartialType } from '@nestjs/mapped-types';
import { CreateBrokerAuthDto } from './create-broker-auth.dto';

export class UpdateBrokerAuthDto extends PartialType(CreateBrokerAuthDto) {}
