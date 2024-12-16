import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import {
  INVALID_TOKEN,
  TOKEN_EXPIRED,
  UNAUTHORIZED,
} from 'src/constants/auth.constant';
import { errorResponse } from 'src/utils/types/app-response.type';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private request: Request;
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.request = context.switchToHttp().getRequest();

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    let buildErrorResponse: errorResponse = {
      status: false,
      statusCode: 401,
      message: UNAUTHORIZED.message,
      path: this.request.url,
    };

    //handle token expired
    if (info?.name === TOKEN_EXPIRED.slug) {
      buildErrorResponse = {
        ...buildErrorResponse,
        message: TOKEN_EXPIRED.message,
        error: info,
      };
      throw new UnauthorizedException(buildErrorResponse);
    }

    //handle invalid token
    if (info?.name === INVALID_TOKEN.slug) {
      buildErrorResponse = {
        ...buildErrorResponse,
        message: INVALID_TOKEN.message,
        error: info,
      };
      throw new UnauthorizedException(buildErrorResponse);
    }

    if (err || !user) {
      buildErrorResponse = {
        ...buildErrorResponse,
        message: err?.message || UNAUTHORIZED.message,
        statusCode: err?.status || 401,
      };
      if (buildErrorResponse.statusCode === 401) {
        throw new UnauthorizedException(buildErrorResponse);
      }
      throw err;
    }
    return user;
  }
}
