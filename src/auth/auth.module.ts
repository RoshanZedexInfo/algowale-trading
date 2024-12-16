import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from 'src/configs/config.type';
import { SessionModule } from 'src/session/session.module';
import { UsersModule } from 'src/users/users.module';
import { timeMilliseconds } from 'src/utils/time-milliseconds';
import { IsExist } from 'src/utils/validators/is-exits.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exits.validator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stategies/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Config>) => ({
        secret: configService.get('auth.jwtSecret', { infer: true }),
        signOptions: {
          expiresIn: timeMilliseconds(
            configService.get('auth.jwtExpires', { infer: true }),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [IsExist, IsNotExist, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
