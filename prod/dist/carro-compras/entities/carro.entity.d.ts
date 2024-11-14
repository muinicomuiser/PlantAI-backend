import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CarroProducto } from './carro_producto.entity';
export declare class CarroCompra {
    id: number;
    idUsuario: number;
    fecha_creacion: Date;
    fecha_cierre: Date;
    usuario: Usuario;
    carroProductos: CarroProducto[];
    pedido: Pedido;
    constructor(idUsuario: number);
}
