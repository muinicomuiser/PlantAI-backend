import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from './despacho.enum';
import { estadoPedido } from './estado.enum';
import { tipoPago } from './pago.enum';

export class Pedido {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public idUsuario: number;
    @ApiProperty()
    public fechaCreacion: Date;
    @ApiProperty()
    public estado: estadoPedido;
    @ApiProperty()
    public tipoDespacho: tipoDespacho;
    @ApiProperty()
    public tipoPago: tipoPago;
    @ApiProperty()
    public carrito: CarroCompra;
    @ApiProperty()
    public fechaEntrega: Date;
}
