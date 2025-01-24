import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';
import { Etiqueta } from './etiqueta.entity';
import { Planta } from './plantas/planta.entity';
import { Macetero } from './maceteros/macetero.entity';
import { Accesorio } from './accesorios/accesorio.entity';
import { Insumo } from './insumos/insumo.entity';
import { ImagenProducto } from './imagenes.entity';
import { Promocion } from 'src/promociones/entities/promocion.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SKU: string;

  @Column()
  nombre: string;

  @Column({ name: 'id_categoria' })
  idCategoria: number;

  @Column()
  precio: number;

  @Column()
  descripcion: string;

  // @Column()
  // imagen: string;

  @Column()
  stock: number;

  @Column({ name: 'unidades_vendidas' })
  unidadesVendidas: number;

  @Column()
  puntuacion: number;

  @Column()
  ancho: number;

  @Column()
  alto: number;

  @Column()
  largo: number;

  @Column()
  peso: number;

  @Column()
  habilitado: boolean;

  /**Many to One */
  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria; // Por Id_categoria

  /**Many to Many */
  @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.productos, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'productos_etiquetas', // Nombre de la tabla intermedia
    joinColumn: { name: 'id_producto', referencedColumnName: 'id' }, // Columna que referencia a la entidad actual (Producto)
    inverseJoinColumn: { name: 'id_etiqueta', referencedColumnName: 'id' }, // Columna que referencia a la otra entidad (Etiqueta)
  })
  etiquetas: Etiqueta[];

  //Relacion con plantas
  @OneToOne(() => Planta, (planta) => planta.producto)
  planta: Planta;

  //Relacion con maceteros
  @OneToOne(() => Macetero, (macetero) => macetero.producto)
  macetero: Macetero;

  //Relacion con accesorios
  @OneToOne(() => Accesorio, (accesorio) => accesorio.producto)
  accesorio: Accesorio;

  // Relacion con insumos
  @OneToOne(() => Insumo, (insumo) => insumo.producto)
  insumo: Insumo;

  @OneToMany(() => ImagenProducto, (imagen: ImagenProducto) => imagen.producto)
  @JoinColumn({ name: 'imagenes_productos', referencedColumnName: 'id' })
  imagenes: ImagenProducto[];

  /**Propiedad para el soft delete */
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  deletedAt?: Date;

  /**Many to Many */
  @ManyToMany(() => Promocion, (promocion: Promocion) => promocion.productos)
  @JoinTable({
    name: 'productos_promociones', // Nombre de la tabla intermedia
    joinColumn: { name: 'id_producto', referencedColumnName: 'id' }, // Columna que referencia a la entidad actual (Producto)
    inverseJoinColumn: { name: 'id_promocion', referencedColumnName: 'id' }, // Columna que referencia a la otra entidad (Promocion)
  })
  promociones: Promocion[];

}
