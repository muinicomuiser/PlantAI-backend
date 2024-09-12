import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';

export class CarroCompra {
  id: number;
  idUsuario: number;
  productos: Producto[]; // pendiente de definir
  precioTotal: number;
  constructor(
    id: number,
    idUsuario: number,
    productos: Producto[],
    precioTotal: number,
  ) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.productos = productos;
    this.precioTotal = precioTotal;
  }
}
