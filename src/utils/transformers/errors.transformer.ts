import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  INVALID_TOKEN,
  INVALID_TOKEN_SIGNATURE,
  TOKEN_EXPIRED,
  UNAUTHORIZED,
} from 'src/constants/auth.constant';
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

export const HandleGuradError = (
  err,
  user,
  info,
  context: ExecutionContext,
) => {
  const request = context.switchToHttp().getRequest();
  let buildErrorResponse: errorResponse = {
    status: false,
    statusCode: 401,
    message: UNAUTHORIZED.message,
    isValidationError: false,
    path: request.url,
  };

  //handle invalid token signature
  if (info?.name === INVALID_TOKEN_SIGNATURE.slug) {
    buildErrorResponse = {
      ...buildErrorResponse,
      message: info.message,
      error: info,
      trace: info.stack,
    };
    return new UnauthorizedException(buildErrorResponse);
  }

  //handle token expired
  if (info?.name === TOKEN_EXPIRED.slug) {
    buildErrorResponse = {
      ...buildErrorResponse,
      message: TOKEN_EXPIRED.message,
      error: info,
    };
    return new UnauthorizedException(buildErrorResponse);
  }

  //handle invalid token
  if (info?.name === INVALID_TOKEN.slug) {
    buildErrorResponse = {
      ...buildErrorResponse,
      message: INVALID_TOKEN.message,
      error: info,
    };
    return new UnauthorizedException(buildErrorResponse);
  }

  if (err || !user) {
    buildErrorResponse = {
      ...buildErrorResponse,
      message: err?.message || UNAUTHORIZED.message,
      statusCode: err?.status || 401,
    };
    if (buildErrorResponse.statusCode === 401) {
      return new UnauthorizedException(buildErrorResponse);
    }
    return err;
  }
};
