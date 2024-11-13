import { IsNotEmpty } from 'class-validator';

export class BarsRequestDto {
  @IsNotEmpty()
  symbols: string;

  @IsNotEmpty()
  timeframe: string;

  start?: string;

  end?: string;

  limit?: number;
}
