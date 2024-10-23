import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetFotoPediodoDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del fotoperiodo',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Fotoperiodo',
    description: 'Nombre del fotoperiodo',
  })
  @IsString()
  tipoFotoperiodo: string;
}
