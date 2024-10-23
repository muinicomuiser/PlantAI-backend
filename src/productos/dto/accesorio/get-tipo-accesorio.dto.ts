import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetTipoAccesorioDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del tipo de accesorio',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Tipo de accesorio',
    description: 'Nombre del tipo de accesorio',
  })
  @IsString()
  tipo: string;
}
