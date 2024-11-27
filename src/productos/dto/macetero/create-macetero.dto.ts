import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMaceteroDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador de la marca',
  })
  @IsInt()
  idMarca: number;
  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de macetero',
  })
  @IsInt()
  idTipoMacetero: number;
  @ApiProperty({
    example: 'cemento',
    description: 'tipo de material',
  })
  @IsString()
  material: string;
  @ApiProperty({
    example: 'redondo',
    description: 'forma del macetero',
  })
  @IsString()
  forma: string;
  @ApiProperty({
    example: 30,
    description: 'diametro del macetero',
  })
  @IsInt()
  diametro: number;
  @ApiProperty({
    example: 30,
    description: 'litros',
  })
  @IsInt()
  litros: number;

  // relaciones
  @ApiProperty({ description: 'Marca' })
  marca: string;
  @ApiProperty({ description: 'Tipo de macetero' })
  tipoMacetero: string;
}
