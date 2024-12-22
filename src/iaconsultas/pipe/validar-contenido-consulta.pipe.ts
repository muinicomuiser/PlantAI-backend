import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';

@Injectable()
export class ValidarContenidoConsultaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const consulta: ConsultaBase64Dto = value as ConsultaBase64Dto
    if (!consulta.base64 && !consulta.consulta) {
      throw new BadRequestException('No se puede enviar una consulta vacía.')
    }
    return value;
  }
}
