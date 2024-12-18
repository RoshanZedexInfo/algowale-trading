import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserContextInterceptor } from './user-context.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserContextInterceptor,
    },
  ],
})
export class UserContextInterceptorModule {}
