import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrokerAuthsService } from './broker-auths.service';
import { CreateBrokerAuthDto } from './dto/create-broker-auth.dto';
import { UpdateBrokerAuthDto } from './dto/update-broker-auth.dto';

@Controller('broker-auths')
export class BrokerAuthsController {
  constructor(private readonly brokerAuthsService: BrokerAuthsService) {}

  @Post()
  create(@Body() createBrokerAuthDto: CreateBrokerAuthDto) {
    return this.brokerAuthsService.create(createBrokerAuthDto);
  }

  @Get()
  findAll() {
    return this.brokerAuthsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brokerAuthsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrokerAuthDto: UpdateBrokerAuthDto,
  ) {
    return this.brokerAuthsService.update(+id, updateBrokerAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brokerAuthsService.remove(+id);
  }
}
