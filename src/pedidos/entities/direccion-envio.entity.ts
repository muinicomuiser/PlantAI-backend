import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity({ name: 'direcciones_envio' })
export class DireccionEnvio {
  @PrimaryColumn({ name: 'id_pedido' })
  idPedido: number;
  @Column()
  comuna: string;
  @Column()
  calle: string;
  @Column()
  numero: string;
  @Column()
  departamento: string;
  @Column()
  referencia: string;

  @OneToOne(() => Pedido, (pedido) => pedido.direccionEnvio)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;
}
