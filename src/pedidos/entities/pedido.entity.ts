import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { EstadoPedido } from './estado_pedido.entity';
import { TipoDespacho } from './tipo_despacho.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Pago } from 'src/commons/entities/pagos.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'id_usuario' })
  idUsuario: number;
  @Column({ name: 'fecha_creacion' })
  fechaCreacion: Date;
  @Column({ name: 'id_medio_pago' })
  idMedioPago: number;
  @Column({ name: 'id_estado' })
  idEstado: number;
  @Column({ name: 'id_tipo_despacho' })
  idTipoDespacho: number;
  @Column({ name: 'id_carro' })
  idCarro: number;
  @Column()
  fechaEntrega: Date;

  /**Many to One */
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
  Pago: Pago; // Por id_pedido
}
