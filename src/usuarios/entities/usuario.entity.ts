import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Direccion } from './direccion.entity';
import { TipoUsuario } from './tipo_usuario.entity';
import { UsuarioMedioPago } from './usuarios_medio_pago.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  public id: number;
  public contrasena: string;
  public nombre: string;
  public apellido: string;
  public nombre_usuario: string;
  public email: string;
  public telefono: string;
  public genero: string;
  public rut: string;
  public fecha_nacimiento: string;

  /**One to Many */
  public direccion: Direccion[];

  /**Many to One*/
  public tipo_usuario: TipoUsuario; //  a través de: id_tipo_usuario;

  /* One to Many */
  public medio_pago: UsuarioMedioPago[];

  /**One to Many */
  public carros: CarroCompra[];

  /**One to Many */
  public pedidos: Pedido[];
}
