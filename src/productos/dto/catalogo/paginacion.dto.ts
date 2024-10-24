import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginacionDto {
  /**Número de página */
  @ApiProperty({ example: 1, description: 'Número de página' })
  @IsInt({ message: 'El número de página debe ser un entero.' })
  @Min(1, { message: 'El número de la página debe ser al menos 1' })
  page: number;
  /**Cantidad de elementos por página */
  @ApiProperty({ example: 10, description: 'Cantidad de elementos por página' })
  @IsInt({ message: 'Los elementos por página deben ser número entero' })
  @Min(1, { message: 'Las páginas deben mostrar al menos 1 elemento' })
  pageSize: number;
}
