import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'direcciones' })
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  comuna: string;
  @Column()
  calle: string;
  @Column()
  numero: string;
  @Column()
  departamento: string;
  @Column()
  referencia: string;
  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
