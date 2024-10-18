import { Entity } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'tipo_usuarios' })
export class TipoUsuario {
  id: number;
  tipo: string;

  /**One to Many*/
  usuario: Usuario[];
}
