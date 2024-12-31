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
import { CreateGuestUsuarioDto } from '../dto/create-usuario-invitado.dto';
import * as bcrypt from 'bcryptjs';

//import { toOutputUserDTO } from '../mapper/entitty-to-dto-usuarios';
import { v4 as UUIDv4 } from 'uuid';
import { JwtUser } from 'src/auth/guards/jwt-auth.guard/roles.guard';

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
  async updateUserProfile(
    idUsuario: number,
    updateUsuarioDto: UpdateUsuarioDto,
    currentUser: Usuario,
  ): Promise<OutputUserDTO> {
    const usuario = await this.validateUserExists(idUsuario);

    if (currentUser.id !== usuario.id) {
      throw new UnauthorizedException(
        'No puedes modificar el perfil de otro usuario',
      );
    }

    // Filtrar campos sensibles y combinar con los datos actuales
    const updatedData = {
      ...usuario,
      ...updateUsuarioDto,
    };

    const usuarioActualizado = await this.usuariosRepository.preload({
      id: usuario.id,
      ...updatedData,
    });

    if (!usuarioActualizado) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }

    // Guarda el usuario actualizado en la base de datos
    const usuarioGuardado =
      await this.usuariosRepository.save(usuarioActualizado);

    const usuarioConRelaciones = await this.usuariosRepository.findOne({
      where: { id: usuarioGuardado.id },
      relations: ['direccion', 'rol'],
    });

    if (!usuarioConRelaciones) {
      throw new NotFoundException(
        `Usuario con ID ${idUsuario} no encontrado después de actualizar`,
      );
    }

    // Mapea al DTO y retorna
    return toOutputUserDTO(usuarioConRelaciones);
  }

  //cambiar contraseña
  async cambiarContrasena(
    idUsuario: number,
    nuevaContrasena: string,
  ): Promise<void> {
    const usuario = await this.validateUserExists(idUsuario);
    usuario.contrasena = await bcrypt.hash(nuevaContrasena, 10);
    await this.usuariosRepository.save(usuario);
  }

  async cambiarRol(
    idUsuario: number,
    idRol: number,
    currentUser: JwtUser, // Tipo ajustado
  ): Promise<OutputUserDTO> {
    console.log('CurrentUser en cambiarRol:', currentUser);

    // Validar si el usuario actual tiene un rol definido
    if (!currentUser.role) {
      throw new UnauthorizedException('Rol no definido en el usuario actual');
    }

    // // Verificar que el usuario actual tiene permisos para cambiar roles
    // if (currentUser.role !== 'Super Admin' && currentUser.role !== 'Admin') {
    //   throw new UnauthorizedException('No tienes permiso para cambiar roles');
    // }

    // Cargar el usuario objetivo con sus relaciones
    const usuario = await this.usuariosRepository.findOne({
      where: { id: idUsuario },
      relations: ['rol'],
    });

    // Cargar el nuevo rol a asignar
    const rol = await this.rolRepository.findOne({ where: { id: idRol } });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
    }

    // Evitar que un administrador pueda asignar el rol de superadministrador
    if (rol.nombre === 'Super Admin' && currentUser.role !== 'Super Admin') {
      throw new UnauthorizedException(
        'Solo un superadministrador puede asignar el rol de superadministrador',
      );
    }

    // Evitar que un administrador pueda asignar el rol de administrador
    if (rol.nombre === 'Admin' && currentUser.role !== 'Super Admin') {
      throw new UnauthorizedException(
        'Solo un superadministrador puede asignar el rol de administrador',
      );
    }

    // Actualizar el rol del usuario objetivo
    usuario.rol = rol;

    // Guardar los cambios
    const usuarioGuardado = await this.usuariosRepository.save(usuario);

    const usuarioConRelaciones = await this.usuariosRepository.findOne({
      where: { id: usuarioGuardado.id },
      relations: ['rol'],
    });

    if (!usuarioConRelaciones) {
      throw new NotFoundException(
        `Usuario con ID ${idUsuario} no encontrado después de actualizar`,
      );
    }

    // Mapear al DTO y retornar
    return toOutputUserDTO(usuarioConRelaciones);
  }

  /**Elimina un usuario según su id */
  async deleteUser(
    id: number,
    currentUser: { id: number; role: string },
  ): Promise<{ message: string }> {
    // Verificar si el usuario a eliminar existe
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol'], // Cargar relaciones necesarias
    });

    if (currentUser.role === 'Super Admin') {
      // Evitar que un Super Admin se elimine si es el último
      if (currentUser.id === usuario.id) {
        const superAdminsCount = await this.usuariosRepository.count({
          where: { rol: { nombre: 'Super Admin' } },
        });

        if (superAdminsCount <= 1) {
          throw new BadRequestException(
            'No puedes eliminarte a ti mismo porque eres el último superadministrador',
          );
        }
      }

      // Evitar que un Super Admin elimine a otros Super Admins
      if (
        usuario.rol.nombre === 'Super Admin' &&
        currentUser.id !== usuario.id
      ) {
        throw new UnauthorizedException(
          'No puedes eliminar a otro superadministrador',
        );
      }
    } else if (currentUser.role === 'Admin') {
      // Un administrador no puede eliminar superadministradores ni otros administradores
      if (
        usuario.rol.nombre === 'Super Admin' ||
        usuario.rol.nombre === 'Admin'
      ) {
        throw new UnauthorizedException(
          'No tienes permiso para eliminar este usuario',
        );
      }
    } else if (currentUser.role === 'Cliente') {
      // Un cliente solo puede eliminarse a sí mismo
      if (currentUser.id !== usuario.id) {
        throw new UnauthorizedException(
          'No tienes permiso para eliminar a otro usuario',
        );
      }
    } else {
      throw new UnauthorizedException(
        'No tienes permisos para eliminar usuarios',
      );
    }

    await this.usuariosRepository.softDelete(id);

    return { message: `Usuario con ID ${id} eliminado con éxito` };
  }
  //Obtener pedidos por usuario.
  async findPedidos(
    currentUser: JwtUser,
    idUsuario: number,
  ): Promise<GetPedidoUsuarioDto[]> {
    if (currentUser.role === 'Admin' || currentUser.role === 'Super Admin') {
      // Los administradores y superadministradores pueden acceder a cualquier usuario
      const pedidos = await this.pedidosRepository.find({
        where: { idUsuario },
        relations: [
          'medioPago',
          'estadoPedido',
          'tipoDespacho',
          'carro',
          'usuario',
          'Pago',
          'direccionEnvio',
          'productosPedido',
        ],
      });
      return pedidos.map((pedido) => mapperPedido.toDtoUsuario(pedido));
    }

    if (currentUser.role === 'Cliente') {
      // Verifica que el cliente solo acceda a sus propios pedidos
      if (currentUser.id !== idUsuario) {
        throw new UnauthorizedException(
          'No tienes permiso para acceder a estos pedidos',
        );
      }

      const pedidosCliente = await this.pedidosRepository.find({
        where: { idUsuario: currentUser.id },
        relations: [
          'medioPago',
          'estadoPedido',
          'tipoDespacho',
          'carro',
          'usuario',
          'Pago',
          'direccionEnvio',
          'productosPedido',
        ],
      });

      return pedidosCliente.map((pedido) => mapperPedido.toDtoUsuario(pedido));
    }

    // Si el rol no es válido
    throw new UnauthorizedException(
      'No tienes permisos para acceder a los pedidos',
    );
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

  // crear usuario invitado para el carro
  async createGuestUser(
    createGuestUsuarioDto: CreateGuestUsuarioDto,
  ): Promise<OutputUserDTO> {
    const rol = await this.rolRepository.findOne({
      where: { id: 4 },
    });
    let nombreUsuario =
      createGuestUsuarioDto.nombre + '-' + UUIDv4().split('-')[4];
    if (nombreUsuario.length > 25) {
      nombreUsuario = nombreUsuario.slice(0, 25)
      console.log(nombreUsuario)
    }
    const usuario = this.usuariosRepository.create({
      ...createGuestUsuarioDto,
      nombreUsuario,
      contrasena: null,
      rol,
    });
    const usuarioCreado = await this.usuariosRepository.save(usuario);
    return toOutputUserDTO(usuarioCreado);
  }

  async findUserByEmailAddress(email: string): Promise<Usuario> {
    const user = await this.usuariosRepository.findOne({
      where: { email },
      relations: ['rol'],
    });
    return user;
  }


  // Revisar. Si se está permitiendo que se repita el mail en usuarios visitantes, qué usuario actualizará??
  async updateGuestUser(
    id: number,
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<OutputUserDTO> {
    const rol = await this.rolRepository.findOne({
      where: { id: 3 },
    });
    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      rol,
    });
    await this.usuariosRepository.update(id, usuario);
    return toOutputUserDTO(usuario);
  }

  private async validateUserExists(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['rol'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }
}
