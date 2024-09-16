import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from '../entities/despacho.enum';
import { tipoPago } from '../entities/pago.enum';
export declare class CreatePedidoDto {
    idusuario: number;
    tipoDespacho: tipoDespacho;
    tipoPago: tipoPago;
    carrito: CarroCompra;
    fechaEntrega: Date;
}
