import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetEspecieDto {
  @ApiProperty({ example: 1, description: 'Identificador único de la especie' })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Especie',
    description: 'Nombre de la especie',
  })
  @IsString()
  especie: string;
}
