import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';

@Injectable()
export class ValidarConsultaBase64Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const consulta: ConsultaBase64Dto = value as ConsultaBase64Dto
    if (!consulta.base64 && !consulta.consulta) {
      throw new BadRequestException('No se puede enviar una consulta vacía.')
    }
    if (consulta.base64) {
      if (!consulta.base64.includes(',')) {
        throw new BadRequestException('El formato de imagen no es válido.');
      }
      if (!consulta.consulta) {
        consulta.consulta = 'Consulta sin texto'
      }
    }
    return consulta;
  }
}
