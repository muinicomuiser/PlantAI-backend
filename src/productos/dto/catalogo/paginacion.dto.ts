import { ApiProperty } from '@nestjs/swagger';

export class PaginacionDto {
  /**Número de página */
  @ApiProperty({ example: 1, description: 'Número de página' })
  page: number;
  /**Cantidad de elementos por página */
  @ApiProperty({ example: 10, description: 'Cantidad de elementos por página' })
  pageSize: number;
}
