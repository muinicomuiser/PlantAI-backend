import { tipoDespacho } from '../entities/despacho.enum';
import { estadoPedido } from '../entities/estado.enum';
import { tipoPago } from '../entities/pago.enum';
export declare class UpdatePedidoDto {
    estado: estadoPedido;
    tipoDespacho: tipoDespacho;
    tipoPago: tipoPago;
    fechaEntrega: Date;
}
