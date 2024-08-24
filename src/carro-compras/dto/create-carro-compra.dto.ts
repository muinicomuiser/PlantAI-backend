import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/productos/entities/producto.entity';

export class CreateCarroCompraDto {
  @ApiProperty({
    name: 'idUsuario',
    description: 'Identificador del usuario',
    example: 1,
  })
  idUsuario: number;

  @ApiProperty({
    name: 'productos',
    description: 'Productos del carro de compras',
    example: ['producto1', 'producto2'],
  })
  productos?: Producto[]; // pendiente de definir
}
