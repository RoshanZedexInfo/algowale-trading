import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { HandleGuradError } from 'src/utils/transformers/errors.transformer';

@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    const error = HandleGuradError(err, user, info, context);
    if (error) {
      throw error;
    }

    return user;
  }
}
