import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { CreatePlantaDto } from '../planta/create-planta.dto';
import { CreateMaceteroDto } from '../macetero/create-macetero.dto';
import { CreateAccesorioDto } from '../accesorio/create-accesorio.dto';
import { CreateInsumoDto } from '../insumo/create-insumo.dto';
import { DeepPartial } from 'typeorm';

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
    description: 'URL de la imagen del producto',
    example: 'https://www.plantAI.com/imagenes/agatea.jpg',
  })
  @IsString()
  imagen: string;

  @ApiProperty({ description: 'Cantidad disponible del producto', example: 10 })
  @IsNumber()
  @IsInt()
  @Min(0)
  cantidad: number;

  @ApiProperty({ description: 'Unidades vendidas del producto', example: 5 })
  @IsNumber()
  @IsInt()
  @Min(0)
  unidadesVendidas: number;

  @ApiProperty({
    description: 'Puntuación del producto',
    minimum: 0,
    maximum: 5,
    example: 3,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  puntuacion: number;

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

  @ApiProperty({ description: 'Habilitado', example: true })
  @IsBoolean()
  habilitado: boolean;

  @ApiProperty({
    description: 'Planta asociada al producto',
    type: CreatePlantaDto,
  })
  @IsOptional()
  planta?: DeepPartial<CreatePlantaDto>;

  @ApiProperty({
    description: 'Macetero asociado al producto',
    type: CreateMaceteroDto,
  })
  @IsOptional()
  macetero?: DeepPartial<CreateMaceteroDto>;

  @ApiProperty({
    description: 'Accesorio asociado al producto',
    type: CreateAccesorioDto,
  })
  @IsOptional()
  accesorio?: DeepPartial<CreateAccesorioDto>;

  @ApiProperty({
    description: 'Insumo asociado al producto',
    type: CreateInsumoDto,
  })
  @IsOptional()
  insumo?: DeepPartial<CreateInsumoDto>;
}
