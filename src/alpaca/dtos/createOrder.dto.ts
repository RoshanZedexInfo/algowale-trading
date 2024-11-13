import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  side: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  time_in_force: string;

  limit_price?: number;

  stop_price?: number;

  client_order_id?: string;

  extended_hours?: boolean;
}
