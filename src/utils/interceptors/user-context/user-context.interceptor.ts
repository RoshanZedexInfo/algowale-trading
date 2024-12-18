import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { UserContext } from 'src/utils/contexts/user.context';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    UserContext.currentUser = request.user;

    return next.handle().pipe(tap(() => (UserContext.currentUser = null)));
  }
}
