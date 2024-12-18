import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NOT_ALLOWED } from 'src/constants/auth.constant';
import { ForbiddenError } from 'src/utils/transformers/errors.transformer';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const isValid = roles.includes(request.user?.role);

    if (!isValid) {
      throw ForbiddenError(NOT_ALLOWED, context);
    }
    return isValid;
  }
}
