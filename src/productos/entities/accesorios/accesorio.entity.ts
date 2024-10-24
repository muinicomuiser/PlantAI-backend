import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoAccesorio } from './tipo_accesorio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ColorProducto } from 'src/commons/entities/color.entity';

@Entity({ name: 'accesorios' })
export class Accesorio {
  @PrimaryColumn({ name: 'id_producto' })
  idProducto: number;

  @Column({ name: 'id_marca' })
  idMarca: number;

  @Column({ name: 'id_tipo_accesorio' })
  idTipoAccesorio: number;

  @Column({ name: 'id_color' })
  idColor: number;

  // Relación Uno a Uno con Producto
  @OneToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  // Relación Muchos a Uno con Marca
  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'id_marca' })
  marca: Marca;

  // Relación Muchos a Uno con TipoAccesorio
  @ManyToOne(() => TipoAccesorio)
  @JoinColumn({ name: 'id_tipo_accesorio' })
  tipoAccesorio: TipoAccesorio;

  // relacion color muchos a uno
  @ManyToOne(() => ColorProducto)
  @JoinColumn({ name: 'id_color' })
  color: ColorProducto;
}
