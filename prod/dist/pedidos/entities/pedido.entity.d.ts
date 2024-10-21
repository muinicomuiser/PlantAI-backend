import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
import { tipoDespacho } from './despacho.enum';
import { estadoPedido } from './estado.enum';
import { tipoPago } from './pago.enum';
export declare class Pedido {
  id: number;
  idUsuario: number;
  fechaCreacion: Date;
  estado: estadoPedido;
  tipoDespacho: tipoDespacho;
  tipoPago: tipoPago;
  carrito: CarroCompra;
  fechaEntrega: Date;
}
