import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class InterceptorOkLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((valor) => {
        // console.log('------------------------------------');
        // console.log('Inicio Interceptor. Respuesta servicio:');
        // console.log(valor);
        // console.log('Fin Interceptor');
        // console.log('------------------------------------');
        return valor;
      }),
    );
  }
}
