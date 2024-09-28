import { Producto } from 'src/productos/entities/producto.entity';
export declare class CarroCompra {
  id: number;
  idUsuario: number;
  productos: Producto[];
  precioTotal: number;
  constructor(
    id: number,
    idUsuario: number,
    productos: Producto[],
    precioTotal: number,
  );
}
