import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from './despacho.enum';
import { estadoPedido } from './estado.enum';
import { tipoPago } from './pago.enum';

export class Pedido {
    public id: number;
    public idUsuario: number;
    public fechaCreacion: Date;
    public estado: estadoPedido;
    public tipoDespacho: tipoDespacho;
    public tipoPago: tipoPago;
    public carrito: CarroCompra;
    public fechaEntrega: Date;
}
