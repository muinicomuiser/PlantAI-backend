import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();

    // Configuración inicial para errores genéricos
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocurrió un error interno en el servidor';
    let responseBody: any = {
      statusCode: status,
      message,
      path: request.url,
      method: request.method,
      timestamp,
    };

    // Manejo detallado de errores
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      responseBody =
        typeof exceptionResponse === 'object'
          ? {
            ...exceptionResponse,
            path: request.url,
            timestamp,
          }
          : {
            statusCode: status,
            message: exception.message,
            path: request.url,
            timestamp,
          };
    } else if (exception instanceof QueryFailedError) {
      console.error('Error de SQL:', exception.message);
      message = 'Error en la base de datos. Verifique los datos enviados.';
      responseBody = {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        sqlError: exception.message,
        query: exception['query'],
        parameters: exception['parameters'],
        path: request.url,
        method: request.method,
        timestamp,
      };
    } else if (exception instanceof Error) {
      console.error('Error genérico:', exception.message);
      responseBody = {
        statusCode: status,
        message: exception.message,
        path: request.url,
        method: request.method,
        timestamp,
      };
    }

    // Logs detallados para todos los errores
    console.error({
      status: responseBody.statusCode,
      message: responseBody.message,
      path: responseBody.path,
      method: responseBody.method,
      stack: exception instanceof Error ? exception.stack : null,
    });

    // Responder al cliente
    response.status(status).json(responseBody);
  }
}
