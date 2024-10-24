import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { MedioPago } from './medio_pago.entity';
export declare class Pago {
    id: number;
    idMedioPago: number;
    idPedido: number;
    fecha: Date;
    monto: number;
    medioPago: MedioPago;
    pedido: Pedido;
}
