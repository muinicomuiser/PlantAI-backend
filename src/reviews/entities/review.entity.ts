import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'id_producto' })
  idProducto: number;

  @Column({ type: 'int', default: 5, comment: 'evaluación entre 1 y 5' })
  puntuacion: number;

  @Column({ type: 'text', nullable: true, comment: 'comentario del usuario' })
  comentario: string;

  @Column({ name: "fecha_creacion", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  /**relación con Usuario */
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  /**Relación con producto */
  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
