import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Direccion } from './direccion.entity';
import { TipoUsuario } from './tipo_usuario.entity';
import { UsuarioMedioPago } from './usuarios_medio_pago.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro.entity';
export declare class Usuario {
    id: number;
    contrasena: string;
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    email: string;
    telefono: string;
    genero: string;
    rut: string;
    fechaNacimiento: Date;
    direccion: Direccion[];
    tipoUsuario: TipoUsuario;
    usuarioMedioPago: UsuarioMedioPago[];
    carros: CarroCompra[];
    pedidos: Pedido[];
}
