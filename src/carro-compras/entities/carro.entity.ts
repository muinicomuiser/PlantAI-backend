import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CarroProducto } from './carro_producto.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'carros' })
export class CarroCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
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
  @OneToMany(() => CarroProducto, (carroProducto) => carroProducto.carro)
  carroProductos: CarroProducto[];

  /**One to One */
  @OneToOne(() => Pedido, (pedido) => pedido.carro)
  pedido: Pedido;

  /**Propiedad para el soft delete */
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  deletedAt?: Date;

  constructor(idUsuario: number) {
    this.idUsuario = idUsuario;
    this.fecha_creacion = new Date();
  }
}
