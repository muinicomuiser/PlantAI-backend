import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { EstadoPedido } from '../entities/estado_pedido.entity';
import { TipoDespacho } from '../entities/tipo_despacho.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro.entity';
import { Pago } from 'src/commons/entities/pagos.entity';
export declare class GetPedidoDto {
    id: number;
    idUsuario: number;
    fechaCreacion: Date;
    idMedioPago: number;
    idEstado: number;
    idTipoDespacho: number;
    idCarro: number;
    fechaEntrega: Date;
    usuario?: Usuario;
    medioPago?: MedioPago;
    estadoPedido?: EstadoPedido;
    tipoDespacho?: TipoDespacho;
    carro?: CarroCompra;
    Pago?: Pago;
}
