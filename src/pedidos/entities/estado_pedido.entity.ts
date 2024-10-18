import { Entity } from "typeorm";

@Entity({ name: 'estados_pedido' })
export class EstadoPedido {
  id: number;
  estado: string;
}