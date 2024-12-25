import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConsultaBinario } from '../dto/consulta-binario.dto';

/**Toma del request el File como "archivo" y el texto de la consulta */
export const BodyBinario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = {
      archivo: request['file'] ? request['file'] : undefined,
      consulta: request.body['consulta'],
    };
    return value as ConsultaBinario;
  },
);
