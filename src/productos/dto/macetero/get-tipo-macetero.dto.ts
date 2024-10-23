import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetTipoMaceteroDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único del tipo de macetero',
  })
  @IsInt()
  id: number;
  @ApiProperty({
    example: 'Macetero',
    description: 'Nombre del tipo de macetero',
  })
  @IsString()
  tipo: string;
}
