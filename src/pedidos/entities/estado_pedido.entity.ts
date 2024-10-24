import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estados_pedido' })
export class EstadoPedido {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  estado: string;
}
