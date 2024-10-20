import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'tipo_usuarios' })
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tipo: string;

  /**One to Many*/
  @OneToMany(() => Usuario, (usuarios) => usuarios.tipoUsuario)
  usuarios: Usuario[];
}
