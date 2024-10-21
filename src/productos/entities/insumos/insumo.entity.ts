import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoInsumo } from './tipo_insumo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'insumos' })
export class Insumo {
  @PrimaryColumn({ name: 'id_producto' })
  idProducto: number;

  @Column({ name: 'id_tipo_insumo' })
  idTipoInsumo: number;

  @Column({ name: 'id_marca' })
  idMarca: number;

  // Relación Muchos a Uno con Producto
  @OneToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  // Relación Muchos a Uno con Marca
  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'id_marca' })
  marca: Marca;

  // Relación Muchos a Uno con TipoInsumo
  @ManyToOne(() => TipoInsumo)
  @JoinColumn({ name: 'id_tipo_insumo' })
  tipoInsumo: TipoInsumo;
}
