import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toOutputUserDTO } from '../mapper/entitty-to-dto-usuarios';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Rol } from '../entities/rol.entity';
import { Usuario } from '../entities/usuario.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { mapperPedido } from 'src/pedidos/mapper/pedido.mapper';
import { GetPedidoDto } from 'src/pedidos/dto/get-pedido.dto';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { UsuarioMedioPago } from '../entities/usuarios_medio_pago.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
    @InjectRepository(MedioPago)
    private readonly medioPagoRepository: Repository<MedioPago>,
    @InjectRepository(UsuarioMedioPago)
    private readonly usuarioMedioPagoRepository: Repository<UsuarioMedioPago>,
  ) {}

  /**Retorna todos los usuarios */
  async findAll(): Promise<OutputUserDTO[]> {
    const usuarios = await this.usuariosRepository.find({
      relations: ['rol', 'direccion', 'usuarioMedioPago', 'carros', 'pedidos'],
    });
    return usuarios.map(toOutputUserDTO);
  }

  /**Obtiene un usuario según su id */
  async findById(id: number): Promise<OutputUserDTO> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol', 'direccion', 'usuarioMedioPago', 'carros', 'pedidos'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return toOutputUserDTO(usuario);
  }

  /**Crear un usuario */
  async createUser(
    createUsuarioDto: CreateUsuarioDto,
    rol: Rol,
  ): Promise<OutputUserDTO> {
    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      rol,
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
      relations: ['rol', 'direccion', 'usuarioMedioPago', 'carros', 'pedidos'],
    });
    //validacion de id
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    //actualiza el usuario:
    this.usuariosRepository.merge(usuario, UpdateUsuarioDto);
    const usuarioActualizado = await this.usuariosRepository.save(usuario);

    return toOutputUserDTO(usuarioActualizado);
  }

  /**Elimina un usuario según su id */
  async deleteUser(id: number): Promise<{ message: string }> {
    //verificar id
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: { direccion: true },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    // usuario.direccion = []
    //eliminar usuario
    await this.usuariosRepository.softDelete(id);
    // await this.usuariosRepository.delete(id);
    return { message: `Usuario con ID ${id} eliminado con éxito` };
  }

  async findByUsername(nombreUsuario: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { nombreUsuario },
      relations: ['rol'],
    });
    if (!usuario) {
      throw new NotFoundException(
        `Usuario con nombre de usuario ${nombreUsuario} no encontrado`,
      );
    }
    return usuario;
  }

  /**Retorna los pedidos asociados a un id de usuario */
  async findPedidos(idUsuario: number): Promise<GetPedidoDto[]> {
    const pedidos = await this.pedidosRepository.find({
      where: { idUsuario },
      relations: [
        'medioPago',
        'estadoPedido',
        'tipoDespacho',
        'carro',
        'usuario',
        'Pago',
      ],
    });
    if (pedidos.length === 0) {
      throw new NotFoundException(
        `No se encontraron pedidos para el usuario con ID ${idUsuario}`,
      );
    }
    return pedidos.map(mapperPedido.toDto);
  }

  /**Actualiza el medio de pago de un usuario según su id */
  async updateMedioPago(
    idUsuario: number,
    medioPago: MedioPago,
  ): Promise<{ message: string }> {
    const usuarioMedioPago = await this.usuarioMedioPagoRepository.findOne({
      where: { idUsuario, idMedioPago: medioPago.id },
    });
    if (usuarioMedioPago) {
      throw new BadRequestException(`Medio de pago ya inscrito`);
    }

    const nuevaRelacion = this.usuarioMedioPagoRepository.create({
      idUsuario,
      idMedioPago: medioPago.id,
      esPreferido: true,
    });
    await this.usuarioMedioPagoRepository.save(nuevaRelacion);

    return { message: `medio de pago habilitado` };
  }
  //buscar medio de pago por nombre para traspasarlo a id
  async findMedioPagoByName(nombre: string): Promise<MedioPago> {
    const medioPago = await this.medioPagoRepository.findOne({
      where: { nombre },
    });

    if (!medioPago) {
      throw new NotFoundException(`El medio de pago "${nombre}" no existe.`);
    }

    return medioPago;
  }

  //Buscar medio de pago por id
  async findMedioPagoByUsuarioId(idUsuario: number): Promise<MedioPago[]> {
    const usuarioMediosPago = await this.usuarioMedioPagoRepository.find({
      where: { idUsuario },
      relations: ['medioPago'],
    });
    return usuarioMediosPago.map((relacion) => relacion.medioPago);
  }
}
