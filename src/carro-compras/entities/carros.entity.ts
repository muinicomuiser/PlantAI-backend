import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductosCarro } from './carro_productos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'carros' })
export class CarroCompra {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  idUsuario: number;
  @Column()
  fecha_creacion: Date;
  @Column({ nullable: true })
  fecha_cierre: Date;

  /**Many to One */
  @ManyToOne(() => Usuario, (usuario) => usuario.carros)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario; // Por id_usuario

  /**One to Many*/
  @OneToOne(() => ProductosCarro, (productosCarro) => productosCarro.carro)
  carroProductos: ProductosCarro[];

  /**One to One */
  @OneToOne(() => Pedido, (pedido) => pedido.carro)
  pedido: Pedido;
}
