import { PartialType } from '@nestjs/mapped-types';
import { BrokerAuth } from '../entities/broker-auth.entity';

export class CreateBrokerAuthDto extends PartialType(BrokerAuth) {}
