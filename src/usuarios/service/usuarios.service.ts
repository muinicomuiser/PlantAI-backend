import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { OutputUserDTO } from '../dto/output-userDTO';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { tipoPago } from 'src/pedidos/entities/pago.enum';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';

@Injectable()
export class UsuariosService {
  users: Usuario[] = [];
  usersDTO: OutputUserDTO[] = [];
  pedidos: Pedido[] = [];

  constructor() {
    this.users.push(
      new Usuario(
        1,
        'User1',
        '1234',
        'user1@gmail.com',
        new CarroCompra(1, 1, [], 0),
        undefined,
      ),
    );
    this.usersDTO.push(
      new OutputUserDTO(
        this.users[0].username,
        this.users[0].email,
        this.users[0].carrito,
        this.users[0].pedidos,
      ),
    );
  }

  /**Retorna todos los usuarios */
  findAll() {
    return this.usersDTO;
  }

  /**Obtiene un usuario según su id */
  findOne(id: number) {
    return this.usersDTO[id - 1];
  }

  /**Crear un usuario */
  createUser(usuario: CreateUsuarioDto) {
    return usuario;
  }

  /**Actualiza un usuario según su id */
  updateOne(id: number, usuario: UpdateUsuarioDto) {
    return 'Usuario actualizado';
  }

  /**Elimina un usuario según su id */
  deleteOne(id: number) {
    return { mensaje: 'Usuario eliminado' };
  }

  /**Actualiza el carro de un usuario según su id */
  updateCarro(idUsuario: number, carro: UpdateCarroCompraDto) {
    return carro;
  }

  /**Retorna los pedidos asociados a un id de usuario */
  findPedidos(idUsuario: number) {
    return 'Retorna los pedidos del usuario según el ID';
  }

  /**Agrega un pedido a un usuario según su id */
  addPedido(idUsuario: number, pedido: CreatePedidoDto) {
    return 'Agrega un pedido a un usuario';
  }

  /**Actualiza el medio de pago de un usuario según su id */
  updateMedioPago(idUsuario: number, medioPago: tipoPago) {
    return 'Actualiza el Medio de Pago de un usuario';
  }
}
