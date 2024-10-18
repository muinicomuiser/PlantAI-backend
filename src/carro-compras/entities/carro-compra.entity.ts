import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductosCarro } from './carro_productos.entity';

export class CarroCompra {
  id: number;

  fecha_creacion: Date;

  fecha_cierre: Date;

  /**Many to One */
  usuario: Usuario; // Por id_usuario

  /**One to Many*/
  productos_carro: ProductosCarro[]

  /**One to One */
  pedido: Pedido;
}
