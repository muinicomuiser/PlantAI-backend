import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';

@Injectable()
export class UsuariosService {
  constructor() {}

  /**Retorna todos los usuarios */
  findAll() {
    return null;
  }

  /**Obtiene un usuario según su id */
  findOne(id: number) {
    return null;
  }

  /**Crear un usuario */
  createUser(usuario: CreateUsuarioDto) {
    return null;
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
  updateMedioPago(idUsuario: number, medioPago: string) {
    return 'Actualiza el Medio de Pago de un usuario';
  }
}
