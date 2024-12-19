import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserContext } from 'src/utils/contexts/user.context';
import { ResponseDTO } from 'src/utils/types/route-response.type';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthRegisterLogin } from './dto/auth-register-login.dto';
import { EmailLoginDto } from './dto/email-login.dto';
import { JwtAuthRefreshGuard } from './guards/jwt-auth-refresh.guard';
import { LoginResponseType } from './types/login-response.type';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: EmailLoginDto,
  ): Promise<ResponseDTO<LoginResponseType>> {
    const loginResponse = await this.authService.login(loginDto);
    return {
      message: 'Login successful',
      data: loginResponse,
    };
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: AuthRegisterLogin,
  ): Promise<ResponseDTO<User>> {
    const user = await this.authService.register(registerDto);
    return {
      message: 'User created',
      data: user,
    };
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @Public()
  @UseGuards(JwtAuthRefreshGuard)
  @HttpCode(HttpStatus.OK)
  public async refresh(): Promise<
    ResponseDTO<Omit<LoginResponseType, 'user'>>
  > {
    const loginResponse = await this.authService.refresh(
      UserContext.currentUser,
    );
    return {
      message: 'Token refreshed',
      data: loginResponse,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(): Promise<ResponseDTO<boolean>> {
    const loggedOut = await this.authService.logout();
    return {
      message: 'Logout successful',
      data: loggedOut,
    };
  }
}
