import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Direccion } from './direccion.entity';
import { Rol } from './rol.entity';
import { UsuarioMedioPago } from './usuarios_medio_pago.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarroCompra } from 'src/carro-compras/entities/carro.entity';

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
  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol; //  a través de: id_rol;

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

  /**Propiedad para el soft delete */
  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  deletedAt?: Date;
}
