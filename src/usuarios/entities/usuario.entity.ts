import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Direccion } from './direccion.entity';
import { TipoUsuario } from './tipo_usuario.entity';
import { UsuarioMedioPago } from './usuarios_medio_pago.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  contrasena: string;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column({ name: 'nombre_usuario' })
  nombreUsuario: string;
  @Column()
  email: string;
  @Column()
  telefono: string;
  @Column()
  genero: string;
  @Column()
  rut: string;
  @Column({ name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  /**One to Many */
  @OneToMany(() => Direccion, (direccion) => direccion.usuario)
  direccion: Direccion[];

  /**Many to One*/
  @ManyToOne(() => TipoUsuario)
  @JoinColumn({ name: 'id' })
  tipoUsuario: TipoUsuario; //  a través de: id_tipo_usuario;

  /* One to Many */
  @OneToMany(
    () => UsuarioMedioPago,
    (usuarioMedioPago) => usuarioMedioPago.usuario,
  )
  usuarioMedioPago: UsuarioMedioPago[];

  /**One to Many */
  @OneToMany(() => CarroCompra, (carro) => carro.usuario)
  carros: CarroCompra[];

  /**One to Many */
  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];
}
