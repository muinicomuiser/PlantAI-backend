import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConsultaBinario } from '../dto/consulta-binario.dto';

@Injectable()
export class ValidarConsultaBinarioPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): ConsultaBinario {
    const consulta: ConsultaBinario = value as ConsultaBinario
    if (!consulta.archivo && !consulta.consulta) {
      throw new BadRequestException('No se puede enviar una consulta vacía.')
    }
    return value;
  }
}
