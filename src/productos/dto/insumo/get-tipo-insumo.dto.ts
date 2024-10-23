import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetTipoInsumoDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del tipo de insumo',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Tipo de insumo',
    description: 'Nombre del tipo de insumo',
  })
  @IsString()
  tipoInsumo: string;
}
