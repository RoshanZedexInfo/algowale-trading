import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Config } from 'src/configs/config.type';
import { EMAILNOTFOUND, INCORRECTPASSWORD } from 'src/constants/auth.constant';
import { Session } from 'src/session/entities/session.entity';
import { SessionService } from 'src/session/session.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserContext } from 'src/utils/contexts/user.context';
import { timeMilliseconds } from 'src/utils/time-milliseconds';
import { AuthRegisterLogin } from './dto/auth-register-login.dto';
import { EmailLoginDto } from './dto/email-login.dto';
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type';
import { LoginResponseType } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<Config>,
    private sessionService: SessionService,
  ) {}

  async login(loginDto: EmailLoginDto): Promise<LoginResponseType> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            email: EMAILNOTFOUND,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException({
        status: HttpStatus.FORBIDDEN,
        errors: {
          password: INCORRECTPASSWORD,
        },
      });
    }

    const session = await this.sessionService.create({
      user,
    });

    const { token, refreshToken, expiresIn } = await this.getTokensData({
      id: user.id,
      role: user.role,
      useremail: user.email,
      sessionId: session.id,
    });

    return {
      refreshToken,
      token,
      expiresIn,
      user,
    };
  }

  async register(registerDto: AuthRegisterLogin) {
    const user = await this.usersService.create({
      ...registerDto,
    });
    return user;
  }

  async refresh(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOne({
      where: {
        id: data.sessionId,
      },
    });

    if (!session) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            session: 'Session not found',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { token, refreshToken, expiresIn } = await this.getTokensData({
      id: session.user.id,
      role: session.user.role,
      useremail: session.user.email,
      sessionId: session.id,
    });

    return {
      refreshToken,
      token,
      expiresIn,
    };
  }

  async logout() {
    const user = UserContext.currentUser;
    await this.sessionService.softDelete({
      id: user.sessionId,
    });
    return true;
  }

  private async getTokensData(data: {
    id: User['id'];
    role: User['role'];
    useremail: User['email'];
    sessionId: Session['id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.jwtExpires', {
      infer: true,
    });

    const expiresIn = Date.now() + timeMilliseconds(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          useremail: data.useremail,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.jwtSecret', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      expiresIn,
    };
  }
}
