import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidarBase64Pipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.imagen) {
      const imagen: string = value.imagen
      if (!imagen.includes(',')) {
        throw new BadRequestException('El formato de imagen no es válido.')
      }
    }
    if (value.base64 && value.base64.base64Content) {
      const imagen: string = value.base64.base64Content
      if (!imagen.includes(',')) {
        throw new BadRequestException('El formato de imagen no es válido.')
      }
    }
    return value;
  }
}
