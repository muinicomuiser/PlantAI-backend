import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers } = request;

    const startTime = Date.now();

    // Log de la solicitud entrante
    this.logger.info(`Incoming Request: ${method} ${url}`, {
      method,
      url,
      body,
      headers,
    });

    return next.handle().pipe(
      tap((responseData) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const duration = Date.now() - startTime;

        // Log de la respuesta
        this.logger.info(`Response: ${method} ${url}`, {
          method,
          url,
          statusCode,
          duration: `${duration}ms`,
          response: responseData,
        });
      }),
    );
  }
}
