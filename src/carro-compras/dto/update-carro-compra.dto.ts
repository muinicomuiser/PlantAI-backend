import { PartialType } from '@nestjs/mapped-types';
import { CreateCarroCompraDto } from './create-carro-compra.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarroCompraDto extends PartialType(CreateCarroCompraDto) {
    
  @ApiProperty({
    name: 'productos',
    description: 'Productos del carro de compras',
    example: ['producto1', 'producto2'],
  })
  productos?: Producto[]; // pendiente de definir
}
