import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { GetPedidoDto } from 'src/pedidos/dto/get-pedido.dto';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { mapperPedido } from 'src/pedidos/mapper/pedido.mapper';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Rol } from '../entities/rol.entity';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioMedioPago } from '../entities/usuarios_medio_pago.entity';
import { toOutputUserDTO } from '../Mapper/entitty-to-dto-usuarios';
import { GetPedidoUsuarioDto } from 'src/pedidos/dto/get-pedido.usuario.dto';
//import { toOutputUserDTO } from '../mapper/entitty-to-dto-usuarios';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
    @InjectRepository(MedioPago)
    private readonly medioPagoRepository: Repository<MedioPago>,
    @InjectRepository(UsuarioMedioPago)
    private readonly usuarioMedioPagoRepository: Repository<UsuarioMedioPago>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }

  /**Retorna todos los usuarios */
  async findAll(): Promise<OutputUserDTO[]> {
    const usuarios = await this.usuariosRepository.find({
      relations: ['rol', 'direccion', 'usuarioMedioPago', 'carros', 'pedidos'],
    });
    if (!usuarios.length) {
      throw new NotFoundException(
        'No se encntraron usaurios en la base de datos',
      );
    }
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
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<OutputUserDTO> {
    try {
      const usuario = await this.usuariosRepository.findOne({
        where: { id },
        relations: ['rol'],
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      if (updateUsuarioDto.idRol) {
        const rol = await this.rolRepository.findOne({
          where: { id: updateUsuarioDto.idRol },
        });

        if (!rol) {
          throw new NotFoundException(
            `Rol con ID ${updateUsuarioDto.idRol} no encontrado`,
          );
        }

        usuario.rol = rol;
      }

      const updatedData = { ...updateUsuarioDto, rol: usuario.rol };

      const usuarioActualizado = await this.usuariosRepository.preload({
        id,
        ...updatedData,
      });

      if (!usuarioActualizado) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      console.log('Datos antes de guardar:', usuarioActualizado);

      const usuarioGuardado =
        await this.usuariosRepository.save(usuarioActualizado);

      return toOutputUserDTO(usuarioGuardado);
    } catch (error) {
      console.error(
        'Error en servicio de actualización de usuarios:',
        error.message,
      );

      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(
          'Solicitud duplicada detectada. La data ingresada entra en conflicto con nuestros registros actuales.',
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Un error inesperado ocurrió actualizando usuarios',
      );
    }
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
  async findPedidos(user: any, idUsuario?: number): Promise<GetPedidoUsuarioDto[]> {
    try {
      if (user.role === 'Admin' || user.role === 'Super Admin') {
        const pedidos: Pedido[] = await this.pedidosRepository.find({
          where: { idUsuario: idUsuario },
          relations: [
            'medioPago',
            'estadoPedido',
            'tipoDespacho',
            'carro',
            'usuario',
            'Pago',
            'direccionEnvio',
            'productosPedido'
          ],
        });
        console.log('pedidos', pedidos)
        if (pedidos.length > 0) {
          return pedidos.map(pedido => mapperPedido.toDtoUsuario(pedido));
        }
        else {
          return []
        }

      }
      if (user.role == 'Cliente') {
        if (user.id !== idUsuario) {
          throw new UnauthorizedException('error')
        }
        const pedidosCliente = await this.pedidosRepository.find({
          where: {
            idUsuario: user.id
          }
        })
        if (pedidosCliente.length > 0) {
          return pedidosCliente.map(pedido => mapperPedido.toDtoUsuario(pedido));
        }
        else {
          return []
        }
      }
    }
    catch (error) {
      console.error(error)
      throw new BadRequestException('Error al obtener pedidos del usuario')
    }
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
