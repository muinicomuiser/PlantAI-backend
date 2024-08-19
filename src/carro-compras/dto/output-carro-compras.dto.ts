import { ApiProperty } from "@nestjs/swagger";
import { Producto } from "src/productos/entities/producto.entity";

export class OutputCarroComprasDto {
  @ApiProperty({name: 'id', description: 'Identificador del carro de compras', example: 1})
  id: number;

  @ApiProperty({name: 'idUsuario', description: 'Identificador del usuario', example: 1})
  idUsuario: number;

  @ApiProperty({name: 'productos', description: 'Productos del carro de compras', example: ['producto1', 'producto2']})
  productos: Producto[];  // pendiente de definir

  @ApiProperty({name: 'precioTotal', description: 'Precio total del carro de compras', example: 100})
  precioTotal: number;
}