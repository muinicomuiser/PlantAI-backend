import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { estadoPedido } from '../entities/estado.enum';
import { tipoDespacho } from '../entities/despacho.enum';
import { tipoPago } from '../entities/pago.enum';

export class OutputPedidoDto {
    @ApiProperty({})
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

    constructor(idUsuario: number, estado: estadoPedido, tipoDespacho: tipoDespacho, tipoPago: tipoPago, carrito: CarroCompra){
        this.id = 0;
        this.idUsuario = idUsuario;
        this.fechaCreacion = new Date();
        this.estado = estado;
        this.tipoDespacho = tipoDespacho;
        this.tipoPago = tipoPago;
        this.carrito = carrito;
        this.fechaEntrega = new Date();
    }
}