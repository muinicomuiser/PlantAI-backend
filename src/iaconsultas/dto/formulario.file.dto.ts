import { ApiProperty } from '@nestjs/swagger';

/**Clase de referencia para configurar la carga de archivos en Swagger */
export class FormularioFileDto {
  @ApiProperty({
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  archivo: Express.Multer.File;
}
