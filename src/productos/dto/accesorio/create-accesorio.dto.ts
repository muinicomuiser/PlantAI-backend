import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateAccesorioDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsInt()
  idMarca: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de accesorio',
  })
  @IsInt()
  idTipoAccesorio: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del color',
  })
  @IsInt()
  idColor: number;

  // relaciones
  @ApiProperty({ description: 'Marca' })
  marca: string;

  @ApiProperty({ description: 'Tipo de accesorio' })
  tipoAccesorio: string;

  @ApiProperty({ description: 'Color' })
  color: string;
}
