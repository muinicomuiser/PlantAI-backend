import { ApiProperty } from '@nestjs/swagger';

export class OutputReviewDto {
  // @ApiProperty({ example: 1, description: 'ID de la review' })
  // id: number;

  // @ApiProperty({
  //   example: 1,
  //   description: 'ID del usuario que realizó la review',
  // })
  // idUsuario: number;

  @ApiProperty({
    example: 'Usuario Ejemplo',
    description: 'Nombre del usuario',
  })
  nombreUsuario: string;

  // @ApiProperty({ example: 1, description: 'ID del producto evaluado' })
  // idProducto: number;

  @ApiProperty({ example: 5, description: 'Puntuación entre 1 y 5' })
  puntuacion: number;

  @ApiProperty({
    example: 'Excelente producto',
    description: 'Comentario del usuario',
  })
  comentario: string;

  @ApiProperty({
    example: '2024-12-07T23:06:05.000Z',
    description: 'Fecha de creación de la review',
  })
  fechaCreacion: Date;
}
