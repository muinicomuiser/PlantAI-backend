import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @ApiProperty({ required: false, example: 'Agatea Verde' })
  @MaxLength(150)
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString()
  @IsOptional()
  nombre: string;

  @ApiProperty({ required: false, example: 5000 })
  @Max(1000000)
  @Min(0)
  @IsOptional()
  @IsInt({ message: 'El precio debe ser un número entero.' })
  precio: number;

  @ApiProperty({ required: false, example: 'plantAI.com/imagenes/agatea.jpg' })
  @IsUrl()
  @IsOptional()
  imagen?: string;

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
  familia?: string;

  @ApiProperty({ required: false, example: 'neutral' })
  @IsOptional()
  fotoperiodo?: string;

  @ApiProperty({ required: false, example: 'regadera' })
  @IsOptional()
  tipoRiego?: string;

  @ApiProperty({ required: false, example: true })
  @IsBoolean()
  @IsOptional()
  petFriendly?: boolean;

  @ApiProperty({ required: false, example: 'verde' })
  @IsString()
  @IsOptional()
  color?: string;
}
