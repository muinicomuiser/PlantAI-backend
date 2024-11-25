import { ApiProperty } from '@nestjs/swagger';
import { GetCarroProductoDto } from './get-carro-producto.dto';

export class GetCarroComprasDto {
  @ApiProperty({
    name: 'id',
    description: 'Identificador del carro de compras',
    example: 1,
  })
  id: number;

  @ApiProperty({
    name: 'idUsuario',
    description: 'Identificador del usuario',
    example: 1,
  })
  idUsuario: number;

  // @ApiProperty({
  //   name: 'productos',
  //   description: 'Productos del carro de compras',
  //   example: ['producto1', 'producto2'],
  // })
  // productos: Producto[];

  @ApiProperty({
    name: 'precioTotal',
    description: 'Precio total del carro de compras',
    example: 55000,
  })
  precioTotal: number;

  @ApiProperty()
  carroProductos: GetCarroProductoDto[];

  @ApiProperty({ description: 'Fecha de creación del carro.' })
  fecha_creacion: Date;

  @ApiProperty({ description: 'Fecha de compra, cierre del carro.' })
  @ApiProperty()
  fecha_cierre: Date;

}
