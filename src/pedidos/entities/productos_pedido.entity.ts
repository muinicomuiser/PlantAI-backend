import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity({ name: 'productos_pedido' })
export class ProductoPedido {
    @PrimaryColumn({ name: 'id_pedido' })
    idPedido: number;
    @PrimaryColumn({ name: 'id_producto' })
    idProducto: number;
    @Column({ name: 'cantidad' })
    cantidad: number;
    @Column({ name: 'precio_compra' })
    precioCompraUnidad: number;
}