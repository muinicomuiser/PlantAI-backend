import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetMarcaDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la marca',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Marca',
    description: 'Nombre de la marca',
  })
  @IsString()
  marca: string;
}
