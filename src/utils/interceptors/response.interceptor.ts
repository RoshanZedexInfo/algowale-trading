import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { errorResponse } from '../types/app-response.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: any) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;
    return {
      status: true,
      statusCode,
      message: res.message ?? 'success',
      data: res.data ?? res,
    };
  }

  errorHandler(execption: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status =
      execption instanceof HttpException
        ? execption.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let buildResponse: errorResponse = {
      status: false,
      statusCode: status,
      path: request.url,
      isValidationError: false,
      message: execption.message,
      trace: execption.stack,
    };

    if (execption.name === 'BadRequestException') {
      const errors = execption.getResponse() as any;
      status = errors?.status || status;
      buildResponse = {
        ...buildResponse,
        statusCode: status,
        message: 'Validation Error',
        isValidationError: true,
        error: errors?.errors,
      };
      //remove trace from response
      delete buildResponse.trace;
    }

    response.status(status).json(buildResponse);
  }
}
