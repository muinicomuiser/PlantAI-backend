import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { timestamp } from 'rxjs';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    /**configuración del estado inicial y mensaje. */

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: any = {
      statysCode: status,
      message: 'Ocurrió un error interno en el servidor',
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    // Si es HTTPEXCEPTION se maneja al detalle:
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      responseBody =
        typeof exceptionResponse === 'object'
          ? {
              ...exceptionResponse,
              path: request.url,
              timestamp: new Date().toISOString(),
            }
          : {
              statusCode: status,
              message: exception.message,
              path: request.url,
              timestamp: new Date().toISOString(),
            };
    }
    console.error({
      status,
      message: responseBody.message,
      path: request.url,
      method: request.method,
      stack: exception instanceof Error ? exception.stack : null,
    });
    /**respuesta al cliente */
    response.status(status).json(responseBody);
  }
}
