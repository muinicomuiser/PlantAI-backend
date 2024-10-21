import { Producto } from 'src/productos/entities/producto.entity';
import { CarroCompra } from './carros.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'carros_productos' })
export class ProductosCarro {
  @PrimaryColumn({ name: 'id_carro' })
  idCarro: number;

  @PrimaryColumn({ name: 'id_producto' })
  idProducto: number;

  @Column({ name: 'cantidad_producto' })
  cantidadProducto: number;

  @ManyToOne(() => CarroCompra, (carro) => carro.carroProductos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_carro' })
  carro: CarroCompra;

  // revisar realacion con producto
  @ManyToOne(() => Producto, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
