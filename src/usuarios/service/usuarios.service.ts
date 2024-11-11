import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { TipoUsuario } from '../entities/tipo_usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(TipoUsuario)
    private readonly tipoUsuarioRepository: Repository<TipoUsuario>,
  ) {}

  /**Retorna todos los usuarios */
  findAll() {
    return null;
  }

  /**Obtiene un usuario según su id */
  findOne(id: number) {
    return null;
  }

  /**Crear un usuario */
  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    //verificar que el id tipo usuario existe en la entidad
    const tipoUsuario = await this.tipoUsuarioRepository.findOne({
      where: { id: createUsuarioDto.tipoUsuarioId },
    });
    if (!tipoUsuario) {
      throw new NotFoundException(
        `TipoUsuario con ID ${createUsuarioDto.tipoUsuarioId} no existe`,
      );
    }

    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      tipoUsuario,
    });
    return this.usuariosRepository.save(usuario);
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
