import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductosCarro } from './carro_productos.entity';
export declare class CarroCompra {
    id: number;
    idUsuario: number;
    fecha_creacion: Date;
    fecha_cierre: Date;
    usuario: Usuario;
    carroProductos: ProductosCarro[];
    pedido: Pedido;
}
