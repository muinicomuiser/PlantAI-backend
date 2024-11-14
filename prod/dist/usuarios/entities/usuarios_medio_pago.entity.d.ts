import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Usuario } from './usuario.entity';
export declare class UsuarioMedioPago {
    idUsuario: number;
    idMedioPago: number;
    esPreferido: boolean;
    usuario: Usuario;
    medioPago: MedioPago;
}
