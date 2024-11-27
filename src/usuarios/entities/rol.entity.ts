import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;

  /**One to Many*/
  @OneToMany(() => Usuario, (usuarios) => usuarios.rol)
  usuarios: Usuario[];
}
