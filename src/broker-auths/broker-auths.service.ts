import { Injectable } from '@nestjs/common';
import { CreateBrokerAuthDto } from './dto/create-broker-auth.dto';
import { UpdateBrokerAuthDto } from './dto/update-broker-auth.dto';

@Injectable()
export class BrokerAuthsService {
  create(createBrokerAuthDto: CreateBrokerAuthDto) {
    return 'This action adds a new brokerAuth';
  }

  findAll() {
    return `This action returns all brokerAuths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brokerAuth`;
  }

  update(id: number, updateBrokerAuthDto: UpdateBrokerAuthDto) {
    return `This action updates a #${id} brokerAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} brokerAuth`;
  }
}
