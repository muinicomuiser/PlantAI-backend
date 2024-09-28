import { ApiProperty } from '@nestjs/swagger';
import { FotoPeriodo, TipoRiego } from '../entities/categorias';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ example: 'Agatea Verde' })
  @MaxLength(150)
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 5000 })
  @Max(1000000)
  @Min(0)
  @IsInt({ message: 'El precio debe ser un número entero.' })
  precio: number;

  @ApiProperty({ required: false, example: 'plantAI.com/imagenes/agatea.jpg' })
  @IsUrl()
  @IsOptional()
  imagen?: string; //URL

  @ApiProperty({
    required: false,
    example: 'Producto ejemplo. Quinta planta de la tienda',
  })
  @MaxLength(1000)
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ required: false, example: 15 })
  @Min(0)
  @IsInt()
  @IsOptional()
  cantidad?: number; //Stock

  @ApiProperty({ required: false, example: 'Aesteraceae' })
  @IsString()
  @IsOptional()
  familia?: string; //<-- enum familia

  @ApiProperty({ required: false, example: 'neutral' })
  @IsEnum(FotoPeriodo)
  @IsOptional()
  fotoperiodo?: FotoPeriodo; //<-- enum FotoPeriodo

  @ApiProperty({ required: false, example: 'regadera' })
  @IsEnum(TipoRiego)
  @IsOptional()
  tipoRiego?: TipoRiego; //<-- enum TipoRiego

  @ApiProperty({ required: false, example: true })
  @IsBoolean()
  @IsOptional()
  petFriendly?: boolean;

  @ApiProperty({ required: false, example: 'verde' })
  @IsString()
  @IsOptional()
  color?: string;
}
