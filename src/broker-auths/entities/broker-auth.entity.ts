import { genSalt, hash } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Broker } from 'src/brokers/entities/broker.entity';
import { User } from 'src/users/entities/user.entity';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('broker_auths')
export class BrokerAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Broker)
  broker: Broker;

  @OneToOne(() => User, {
    eager: false,
    onDelete: 'SET NULL',
  })
  @Column({ type: String })
  clientCode: string;

  @Column({ type: String })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await genSalt();
      this.password = await hash(this.password, salt);
    }
  }

  @Column({ type: String })
  totp: string;

  @Column({ type: String })
  apiKey: string;

  @Column({ type: String, nullable: true })
  state: string;

  @Column({ type: String, nullable: true })
  jwtToken: string;

  @Column({ type: String, nullable: true })
  jwtTokenExpiry: string;

  @Column({ type: String, nullable: true })
  refreshToken: string;

  @Column({ type: String, nullable: true })
  refreshTokenExpiry: string;

  @Column({ type: String, nullable: true })
  feedToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
