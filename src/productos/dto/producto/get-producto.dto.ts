import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { GetCategoriaDto } from '../categoria/get-categoria.dto';
import { GetPlantaDto } from '../planta/get-planta.dto';
import { GetMaceteroDto } from '../macetero/get-macetero.dto';
import { GetAccesorioDto } from '../accesorio/get-accesorio.dto';
import { GetInsumoDto } from '../insumo/get-insumo.dto';

export class GetProductoDto {
  @ApiProperty({ example: 1, description: 'Identificador único del producto' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'ABC123', description: 'SKU del producto' })
  @IsString()
  SKU: string;

  @ApiProperty({
    example: 'Macetero de cerámica',
    description: 'Nombre del producto',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 2,
    description: 'Identificador de la categoría del producto',
  })
  @IsInt()
  idCategoria: number;

  @ApiProperty({ example: 1000.5, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({
    example: 'Macetero hecho a mano',
    description: 'Descripción detallada del producto',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    example: 'macetero.jpg',
    description: 'URL de la imagen del producto',
  })
  @IsString()
  imagen: string;

  @ApiProperty({ example: 50, description: 'Cantidad disponible del producto' })
  @IsInt()
  cantidad: number;

  @ApiProperty({
    example: 20,
    description: 'Número de unidades vendidas del producto',
  })
  @IsInt()
  unidadesVendidas: number;

  @ApiProperty({
    example: 4.5,
    description: 'Puntuación promedio del producto',
  })
  @IsNumber()
  @IsPositive()
  puntuacion: number;

  @ApiProperty({
    example: 10,
    description: 'Ancho del producto en milimetros',
  })
  @IsNumber()
  @IsPositive()
  ancho: number;

  @ApiProperty({ example: 20, description: 'Alto del producto en milimetros' })
  @IsNumber()
  @IsPositive()
  alto: number;

  @ApiProperty({
    example: 30,
    description: 'Largo del producto en milimetros',
  })
  @IsNumber()
  @IsPositive()
  largo: number;

  @ApiProperty({ example: 2.5, description: 'Peso del producto en kilogramos' })
  @IsNumber()
  @IsPositive()
  peso: number;

  @ApiProperty({
    type: GetCategoriaDto,
    description: 'Información de la categoría asociada al producto',
  })
  categoria: GetCategoriaDto;

  // @ApiProperty({
  //   type: [EtiquetaDto],
  //   description: 'Etiquetas asociadas al producto',
  // })
  // etiquetas: EtiquetaDto[];

  @ApiProperty({
    type: GetPlantaDto,
    description: 'Información de la planta asociada al producto',
    required: false,
  })
  @IsOptional()
  planta?: GetPlantaDto;

  @ApiProperty({
    type: GetMaceteroDto,
    description: 'Información del macetero asociado al producto',
    required: false,
  })
  @IsOptional()
  macetero?: GetMaceteroDto;

  @ApiProperty({
    type: GetAccesorioDto,
    description: 'Información del accesorio asociado al producto',
    required: false,
  })
  @IsOptional()
  accesorio?: GetAccesorioDto;

  @ApiProperty({
    type: GetInsumoDto,
    description: 'Información del insumo asociado al producto',
    required: false,
  })
  @IsOptional()
  insumo?: GetInsumoDto;
}
