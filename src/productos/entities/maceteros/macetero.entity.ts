import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoMacetero } from './tipo_macetero.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'maceteros' })
export class Macetero {
  @PrimaryColumn({ name: 'id_producto' })
  idProducto: number;

  @Column()
  material: string;

  @Column()
  forma: string;

  @Column()
  diametro: number;

  @Column({ name: 'id_marca' })
  idMarca: number;

  @Column({ name: 'id_tipo_macetero' })
  idTipoMacetero: number;

  // Relación Muchos a Uno con Producto
  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  // Relación Muchos a Uno con Marca
  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'id_marca' })
  marca: Marca;

  // Relación Muchos a Uno con TipoMacetero
  @ManyToOne(() => TipoMacetero)
  @JoinColumn({ name: 'id_tipo_macetero' })
  tipoMacetero: TipoMacetero;
}
