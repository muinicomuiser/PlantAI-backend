import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { MedioPago } from './medio_pago.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'id_medio_pago' })
  idMedioPago: number;
  @Column({ name: 'id_pedido' })
  idPedido: number;
  @Column()
  fecha: Date;
  @Column()
  monto: number;

  /**Many to One */
  @OneToOne(() => MedioPago)
  @JoinColumn({ name: 'id_medio_pago' })
  medioPago: MedioPago; // Por id_medio_pago

  /**One to One */
  @OneToOne(() => Pedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido; // Por id_pedido
}
