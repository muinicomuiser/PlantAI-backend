import { CarroCompra } from 'src/carro-compras/entities/carro.entity';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Pago } from 'src/commons/entities/pagos.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadoPedido } from './estado_pedido.entity';
import { ProductoPedido } from './productos_pedido.entity';
import { TipoDespacho } from './tipo_despacho.entity';
import { DireccionEnvio } from './direccion-envio.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'fecha_creacion', type: 'date' })
  fechaCreacion: Date;

  @Column({ name: 'id_medio_pago' })
  idMedioPago: number;

  @Column({ name: 'id_estado' })
  idEstado: number;

  @Column({ name: 'id_tipo_despacho' })
  idTipoDespacho: number;

  @Column({ name: 'id_carro' })
  idCarro: number;

  @Column({ name: 'fecha_entrega', type: 'date' })
  fechaEntrega: Date;

  @Column({ name: 'receptor' })
  receptor: string;



  /**Many to One */
  /**Revisar. Por qué traer el usuario desde un pedido. */
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario; // Por id_usuario

  /**Many to One */
  @ManyToOne(() => MedioPago)
  @JoinColumn({ name: 'id_medio_pago' })
  medioPago: MedioPago; // Por id_medio_pago

  /**Many to One*/
  @ManyToOne(() => EstadoPedido)
  @JoinColumn({ name: 'id_estado' })
  estadoPedido: EstadoPedido; // Por id_estado

  /**Many to One*/
  @ManyToOne(() => TipoDespacho)
  @JoinColumn({ name: 'id_tipo_despacho' })
  tipoDespacho: TipoDespacho; // Por id_tipo_despacho

  /**One to One */
  @OneToOne(() => CarroCompra)
  @JoinColumn({ name: 'id_carro' })
  carro: CarroCompra; // Por id_carro

  /**One to One */
  @OneToOne(() => Pago, (pago) => pago.pedido)
  @JoinColumn({ name: 'id' })
  Pago: Pago; // Por id_pedido

  @OneToMany(() => ProductoPedido, (productoPedido) => productoPedido.pedido)
  @JoinColumn({ name: 'id' })
  productosPedido: ProductoPedido[]

  @OneToOne(() => DireccionEnvio, (direccion) => direccion.pedido)
  @JoinColumn({ name: 'id' })
  direccionEnvio: DireccionEnvio;
}
