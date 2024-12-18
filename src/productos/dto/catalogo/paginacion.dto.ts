import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  ORDENARPOR,
  ORDENCATALOGO,
} from 'src/productos/shared/enums/productos.enum';

export class PaginacionDto {
  /**Número de página */
  @ApiProperty({ example: 1, description: 'Número de página', required: true })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'El número de página debe ser un entero.' })
  @Min(1, { message: 'El número de la página debe ser al menos 1' })
  page: number;
  /**Cantidad de elementos por página */
  @ApiProperty({
    example: 10,
    description: 'Cantidad de elementos por página',
    required: true,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Los elementos por página deben ser número entero' })
  @Min(1, { message: 'Las páginas deben mostrar al menos 1 elemento' })
  pageSize: number;
}

export class FiltrosCatalogoDto extends PaginacionDto {
  @ApiProperty({
    description: 'ID del entorno',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'El ID del entorno debe ser un número entero' })
  @IsOptional()
  idEntorno?: number;

  @ApiProperty({
    description: 'Indica si el producto es pet friendly',
    required: false,
  })
  @Transform(({ value }) => {
    if (value === 'false' || value === '0') return false;
    if (value === 'true' || value === '1') return true;
    return Boolean(value);
  })
  @IsBoolean({ message: 'El campo petFriendly debe ser un booleano' })
  @IsOptional()
  petFriendly?: boolean;

  @ApiProperty({
    description: 'puntuacion minima',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'la puntuacion minima debe ser un número entero' })
  @IsOptional()
  puntuacion?: number;

  @ApiProperty({
    description: 'precio maximo',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'El precio maximo debe ser un número entero' })
  @IsOptional()
  maxPrecio?: number;
  @ApiProperty({
    description: 'precio minimo',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'El precio minimo debe ser un número entero' })
  @IsOptional()
  minPrecio?: number;

  @ApiProperty({
    description: 'ID de la tolerancia de temperatura',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({
    message: 'El ID de la tolerancia de temperatura debe ser un número entero',
  })
  @IsOptional()
  idToleranciaTemperatura?: number;

  @ApiProperty({
    description: 'ID de la iluminacion',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'El ID de la iluminacion debe ser un número entero' })
  @IsOptional()
  idIluminacion?: number;

  @ApiProperty({
    description: 'ID del tipo de riego',
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'El ID del tipo de riego debe ser un número entero' })
  @IsOptional()
  idTipoRiego?: number;

  @ApiProperty({
    description: 'Nombre por el cual se ordenará',
    required: false,
  })
  @IsString({ message: 'El campo ordenarPor debe ser un string' })
  @Transform(({ value }) => ORDENARPOR[value])
  @IsOptional()
  ordenarPor?: ORDENARPOR;

  @ApiProperty({
    description:
      'Indica si se ordenará de forma ascendente o descendente con respecto al campo ordenarPor (asc o desc)',
    required: false,
  })
  @IsString({ message: 'El campo orden debe ser un string' })
  @IsOptional()
  @Transform(({ value }) => ORDENCATALOGO[value])
  orden?: ORDENCATALOGO;

  @ApiProperty({
    description: 'ID tamaño de la planta',
    required: false,
  })
  @IsString({ message: 'El campo tamaño debe ser un string' })
  @IsOptional()
  sizePlant?: string;
}

export class SearchCatalogoDto extends PaginacionDto {
  @ApiProperty({
    description: 'Búsqueda',
    required: true,
  })
  @IsString({ message: 'El campo de búsqueda debe ser un string' })
  @Transform(({ value }) => value.trim())
  search: string;
}
