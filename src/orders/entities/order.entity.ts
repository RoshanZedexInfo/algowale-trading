import { TradingBot } from 'src/trading-bots/entities/trading-bot.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tradeId: string;

  @ManyToOne(() => TradingBot, {
    eager: false,
    onDelete: 'SET NULL',
  })
  bot: TradingBot;

  @ManyToOne(() => User, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
