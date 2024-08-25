import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { tipoDespacho } from '../entities/despacho.enum';
import { estadoPedido } from '../entities/estado.enum';
import { tipoPago } from '../entities/pago.enum';
import { CreatePedidoDto } from './create-pedido.dto';

export class UpdatePedidoDto {
    @ApiProperty()
    public estado: estadoPedido;
    @ApiProperty()
    public tipoDespacho: tipoDespacho;
    @ApiProperty()
    public tipoPago: tipoPago;
    @ApiProperty()
    public fechaEntrega: Date;
}
