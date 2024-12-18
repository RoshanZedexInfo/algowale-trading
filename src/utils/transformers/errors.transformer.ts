import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { errorResponse } from '../types/app-response.type';

export const BaseError = (
  statusCode: number = 401,
  message: string = 'Unauthorized',
  path: string = '',
): errorResponse => {
  return {
    status: false,
    statusCode,
    path,
    message,
    error: [],
  };
};

export const ForbiddenError = (message: string, context?: ExecutionContext) => {
  //return new ForbiddenException(message);;
  const baseError = BaseError(403, message);
  if (context) {
    const request = context.switchToHttp().getRequest();
    baseError.path = request.url;
  }
  return new ForbiddenException(baseError);
};
