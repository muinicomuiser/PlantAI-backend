import { Pedido } from "src/pedidos/entities/pedido.entity";
import { MedioPago } from "./medio_pago.entity";

export class Pago {
    id: number;

    fecha: Date;

    monto: number;

    /**Many to One */
    medio_pago: MedioPago; // Por id_medio_pago

    /**One to One */
    pedido: Pedido; // Por id_pedido
}