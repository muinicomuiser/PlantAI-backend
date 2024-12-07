import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateAccesorioDto } from '../accesorio/create-accesorio.dto';
import { CreateInsumoDto } from '../insumo/create-insumo.dto';
import { CreateMaceteroDto } from '../macetero/create-macetero.dto';
import { CreatePlantaDto } from '../planta/create-planta.dto';

export class CreateProductoDto {
  @ApiProperty({ description: 'SKU del producto', example: 'AGT-001' })
  @IsString()
  SKU: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Agatea Verde' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'ID de la categoría', example: 1 })
  @IsInt()
  idCategoria: number;

  @ApiProperty({ description: 'Precio del producto', example: 1000 })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Planta de interior',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Imagen en base64',
    example: 'base64',
  })
  @IsOptional()
  imagen?: string;

  @ApiProperty({ description: 'Cantidad disponible del producto', example: 10 })
  @IsNumber()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Unidades vendidas del producto', example: 5, default: 0 })
  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  unidadesVendidas: number = 0;

  @ApiProperty({
    description: 'Puntuación del producto',
    minimum: 0,
    maximum: 5,
    example: 3,
    default: 5
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  puntuacion: number = 5;

  @ApiProperty({ description: 'Ancho del producto en cm', example: 10 })
  @IsNumber()
  @IsPositive()
  ancho: number;

  @ApiProperty({ description: 'Alto del producto en cm', example: 20 })
  @IsNumber()
  @IsPositive()
  alto: number;

  @ApiProperty({ description: 'Largo del producto en cm', example: 30 })
  @IsNumber()
  @IsPositive()
  largo: number;

  @ApiProperty({ description: 'Peso del producto en kg', example: 0.5 })
  @IsNumber()
  @IsPositive()
  peso: number;

  @ApiProperty({ description: 'Habilitado', example: true, default: true })
  @IsBoolean()
  @IsOptional()
  habilitado: boolean = true;

  @ApiProperty({
    description: 'Planta asociada al producto',
    type: CreatePlantaDto,
  })
  @IsOptional()
  planta?: CreatePlantaDto;

  @ApiProperty({
    description: 'Macetero asociado al producto',
    type: CreateMaceteroDto,
  })
  @IsOptional()
  macetero?: CreateMaceteroDto;

  @ApiProperty({
    description: 'Accesorio asociado al producto',
    type: CreateAccesorioDto,
  })
  @IsOptional()
  accesorio?: CreateAccesorioDto;

  @ApiProperty({
    description: 'Insumo asociado al producto',
    type: CreateInsumoDto,
  })
  @IsOptional()
  insumo?: CreateInsumoDto;
}
