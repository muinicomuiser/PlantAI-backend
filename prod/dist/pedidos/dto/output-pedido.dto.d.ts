import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { estadoPedido } from '../entities/estado.enum';
import { tipoDespacho } from '../entities/despacho.enum';
import { tipoPago } from '../entities/pago.enum';
export declare class OutputPedidoDto {
  id: number;
  idUsuario: number;
  fechaCreacion: Date;
  estado: estadoPedido;
  tipoDespacho: tipoDespacho;
  tipoPago: tipoPago;
  carrito: CarroCompra;
  fechaEntrega: Date;
  constructor(
    idUsuario: number,
    estado: estadoPedido,
    tipoDespacho: tipoDespacho,
    tipoPago: tipoPago,
    carrito: CarroCompra,
  );
}
