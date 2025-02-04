import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**Elimina espacios del código de cupón */
@Injectable()
export class AplanarCodigoCuponPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let codigo: string = value;
    codigo = codigo.trim()
    codigo = codigo.replaceAll(' ', '');
    return codigo;
  }
}
