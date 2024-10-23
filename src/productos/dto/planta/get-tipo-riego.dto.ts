import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetTipoRiegoDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del tipo de riego',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Riego',
    description: 'Nombre del tipo de riego',
  })
  @IsString()
  tipoRiego: string;
}
