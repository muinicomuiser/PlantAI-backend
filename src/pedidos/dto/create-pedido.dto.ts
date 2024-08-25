import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from '../entities/despacho.enum';
import { tipoPago } from '../entities/pago.enum';

export class CreatePedidoDto {
    @ApiProperty()
    public idusuario: number;
    @ApiProperty()
    public tipoDespacho: tipoDespacho;
    @ApiProperty()
    public tipoPago: tipoPago;
    @ApiProperty()
    public carrito: CarroCompra;
    @ApiProperty()
    public fechaEntrega: Date;
}
