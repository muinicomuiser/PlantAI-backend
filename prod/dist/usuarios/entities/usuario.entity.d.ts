import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoPago } from 'src/pedidos/entities/pago.enum';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
export declare class Usuario {
  id: number;
  username: string;
  password: string;
  email: string;
  carrito: CarroCompra;
  pedidos: Pedido[];
  medioPago: tipoPago;
  constructor(
    id: number,
    name: string,
    password: string,
    email: string,
    carrito: CarroCompra,
    pedidos: Pedido[],
  );
}
