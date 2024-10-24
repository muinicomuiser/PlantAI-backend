import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { EstadoPedido } from './estado_pedido.entity';
import { TipoDespacho } from './tipo_despacho.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Pago } from 'src/commons/entities/pagos.entity';
export declare class Pedido {
    id: number;
    idUsuario: number;
    fechaCreacion: Date;
    idMedioPago: number;
    idEstado: number;
    idTipoDespacho: number;
    idCarro: number;
    fechaEntrega: Date;
    usuario: Usuario;
    medioPago: MedioPago;
    estadoPedido: EstadoPedido;
    tipoDespacho: TipoDespacho;
    carro: CarroCompra;
    Pago: Pago;
}
