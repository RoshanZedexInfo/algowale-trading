import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AlpacaService } from './alpaca.service';
import { BarsRequestDto } from './dtos/barsRequest.dto';
import { CreateOrderDto } from './dtos/createOrder.dto';

@Controller('alpaca')
export class AlpacaController {
  constructor(private readonly alpacaService: AlpacaService) {}

  @Get('/account')
  @HttpCode(HttpStatus.OK)
  getAccount() {
    return this.alpacaService.getAccount();
  }

  //create order
  @Post('/orders')
  @HttpCode(HttpStatus.CREATED)
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.alpacaService.createOrder(createOrderDto);
  }

  @Get('/bars')
  @HttpCode(HttpStatus.OK)
  getCandles(@Query() barRequestDto: BarsRequestDto) {
    return this.alpacaService.getSymbolBars(barRequestDto);
  }

  @Get('/bars/open-high')
  @HttpCode(HttpStatus.OK)
  getOpenHigh(@Query() barRequestDto: BarsRequestDto) {
    return this.alpacaService.getOpenHigh(barRequestDto);
  }

  @Get('/bars/open-low')
  @HttpCode(HttpStatus.OK)
  getOpenLow(@Query() barRequestDto: BarsRequestDto) {
    return this.alpacaService.getOpenLow(barRequestDto);
  }
}
