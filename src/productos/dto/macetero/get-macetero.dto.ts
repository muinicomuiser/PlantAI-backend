import { ApiProperty } from '@nestjs/swagger';
import { GetMarcaDto } from '../producto/get-marca.dto';
import { GetTipoMaceteroDto } from './get-tipo-macetero.dto';
import { IsInt, IsString } from 'class-validator';

export class GetMaceteroDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador del producto',
  })
  @IsInt()
  idProducto: number;
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
  @ApiProperty({ description: 'Marca', type: GetMarcaDto })
  marca: GetMarcaDto;
  @ApiProperty({ description: 'Tipo de macetero', type: GetTipoMaceteroDto })
  tipoMacetero: GetTipoMaceteroDto;
}
