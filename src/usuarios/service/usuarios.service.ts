import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { TipoUsuario } from '../entities/tipo_usuario.entity';
import { Usuario } from '../entities/usuario.entity';
import { toOutputUserDTO } from '../mapper/entitty-to-dto-usuarios';
import { Direccion } from '../entities/direccion.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(TipoUsuario)
    private readonly tipoUsuarioRepository: Repository<TipoUsuario>,
  ) { }

  /**Retorna todos los usuarios */
  async findAll(): Promise<OutputUserDTO[]> {
    const usuarios = await this.usuariosRepository.find({
      relations: [
        'tipoUsuario',
        'direccion',
        'usuarioMedioPago',
        'carros',
        'pedidos',
      ],
    });
    return usuarios.map(toOutputUserDTO);
  }

  /**Obtiene un usuario según su id */
  async findById(id: number): Promise<OutputUserDTO> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: [
        'tipoUsuario',
        'direccion',
        'usuarioMedioPago',
        'carros',
        'pedidos',
      ],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return toOutputUserDTO(usuario);
  }

  /**Crear un usuario */
  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<OutputUserDTO> {
    //verificar que el id tipo usuario existe en la entidad
    const tipoUsuario = await this.tipoUsuarioRepository.findOne({
      where: { id: createUsuarioDto.tipoUsuarioId },
    });
    if (!tipoUsuario) {
      throw new NotFoundException(
        `TipoUsuario con ID ${createUsuarioDto.tipoUsuarioId} no existe`,
      );
    }
    //crear nuevo usuario
    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      tipoUsuario,
    });
    const usuarioCreado = await this.usuariosRepository.save(usuario);
    return toOutputUserDTO(usuarioCreado);
  }

  /**Actualiza un usuario según su id */
  async updateOne(
    id: number,
    UpdateUsuarioDto: UpdateUsuarioDto,
  ): Promise<OutputUserDTO> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: [
        'tipoUsuario',
        'direccion',
        'usuarioMedioPago',
        'carros',
        'pedidos',
      ],
    });
    //validacion de id
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    //validación de tipousuario
    if (UpdateUsuarioDto.tipoUsuarioId) {
      const tipoUsuario = await this.tipoUsuarioRepository.findOne({
        where: { id: UpdateUsuarioDto.tipoUsuarioId },
      });
      if (!tipoUsuario) {
        throw new NotFoundException(
          `Tipo Usuario con ID ${UpdateUsuarioDto.tipoUsuarioId} no existe`,
        );
      }
      usuario.tipoUsuario = tipoUsuario;
    }
    //actualiza el usuario:
    this.usuariosRepository.merge(usuario, UpdateUsuarioDto);
    const usuarioActualizado = await this.usuariosRepository.save(usuario);

    return toOutputUserDTO(usuarioActualizado);
  }

  /**Elimina un usuario según su id */
  async deleteUser(id: number): Promise<{ message: string }> {
    //verificar id
    const usuario = await this.usuariosRepository.findOne({ where: { id }, relations: { direccion: true } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    // usuario.direccion = []
    //eliminar usuario
    await this.usuariosRepository.softDelete(id);
    // await this.usuariosRepository.delete(id);
    return { message: `Usuario con ID ${id} eliminado con éxito` };
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
