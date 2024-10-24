import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class GetCategoriaDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la categoría',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'Categoría',
    description: 'Nombre de la categoría',
  })
  @IsString()
  categoria: string;
}
