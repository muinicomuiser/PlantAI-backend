import { ApiProperty } from '@nestjs/swagger';
import { GetMarcaDto } from '../producto/get-marca.dto';
import { GetColorDto } from '../planta/get-color.dto';
import { GetTipoAccesorioDto } from './get-tipo-accesorio.dto';
import { IsInt } from 'class-validator';

export class GetAccesorioDto {
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
  @ApiProperty({ description: 'Marca', type: GetMarcaDto })
  marca: GetMarcaDto;
  @ApiProperty({ description: 'Tipo de accesorio', type: GetTipoAccesorioDto })
  tipoAccesorio: GetTipoAccesorioDto;
  @ApiProperty({ description: 'Color', type: GetColorDto })
  color: GetColorDto;
}
