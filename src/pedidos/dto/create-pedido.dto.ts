import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from '../entities/despacho.enum';
import { tipoPago } from '../entities/pago.enum';

export class CreatePedidoDto {
    @ApiProperty({example: 1})
    public idusuario: number;
    @ApiProperty({example: tipoDespacho.RETIRO})
    public tipoDespacho: tipoDespacho;
    @ApiProperty({example: tipoPago.MERCADOPAGO})
    public tipoPago: tipoPago;
    @ApiProperty({})
    public carrito: CarroCompra;
    @ApiProperty({example: new Date()})
    public fechaEntrega: Date;
}
