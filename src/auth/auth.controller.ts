import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ResponseDTO } from 'src/utils/types/route-response.type';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthRegisterLogin } from './dto/auth-register-login.dto';
import { EmailLoginDto } from './dto/email-login.dto';
import { LoginResponseType } from './types/login-response.type';

@Controller({
  path: 'auth',
  version: '1',
})
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
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
}
