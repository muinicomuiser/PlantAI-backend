import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RemoveInvisibleCharsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      request.body = JSON.parse(
        JSON.stringify(request.body, (key, value) =>
          typeof value === 'string'
            ? value.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
            : value,
        ),
      );
    }

    return next.handle();
  }
}
