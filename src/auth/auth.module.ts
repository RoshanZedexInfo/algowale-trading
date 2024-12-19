import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'src/session/session.module';
import { UsersModule } from 'src/users/users.module';
import { IsExist } from 'src/utils/validators/is-exits.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exits.validator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './stategies/jwt-refresh.strategy';
import { JwtStrategy } from './stategies/jwt-strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), SessionModule],
  controllers: [AuthController],
  providers: [
    IsExist,
    IsNotExist,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
