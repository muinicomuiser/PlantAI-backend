import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { EstadoPedido } from './estado_pedido.entity';
import { TipoDespacho } from './tipo_despacho.entity';
import { Entity } from "typeorm";

@Entity({ name: 'pedidos' })
export class Pedido {
  id: number;
  id_usuario: number;
  fecha_creacion: Date;

  /**Many to One */
  public medio_pago: MedioPago; // Por id_medio_pago

  /**Many to One*/
  public estado_pedido: EstadoPedido; // Por id_estado

  /**Many to One*/
  public tipo_despacho: TipoDespacho; // Por id_tipo_despacho

  /**One to One */
  public carro: CarroCompra; // Por id_carro

  public fecha_entrega: Date;
}
