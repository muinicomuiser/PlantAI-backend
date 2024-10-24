import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity({ name: 'etiquetas' })
export class Etiqueta {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  etiqueta: string;
  // Relación Muchos a Muchos con Productos
  @ManyToMany(() => Producto, (producto) => producto.etiquetas)
  productos: Producto[];
}
