import { Strategy } from 'src/strategies/entities/strategy.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BotStatus,
  OrderSide,
  StopLossType,
  TradeType,
} from 'src/utils/enums/bots.enum';
import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trading_bots')
export class TradingBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'simple-array', array: true, nullable: false })
  symbol: string[];

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Strategy)
  strategy: Strategy;

  @Column({ type: 'double precision', nullable: false })
  takeProfit: Double;

  @Column({ type: 'double precision', nullable: false })
  stopLoss: Double;

  @Column({
    type: 'enum',
    enum: StopLossType,
    default: StopLossType.FIXED,
  })
  slType: StopLossType;

  @Column({ type: 'enum', enum: OrderSide, nullable: false })
  orderSide: OrderSide;

  @Column({ type: 'enum', enum: TradeType, nullable: false })
  tradeType: TradeType;

  @Column({ type: 'double precision', nullable: false })
  funds: Double;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: BotStatus, default: BotStatus.STARTED })
  status: BotStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
