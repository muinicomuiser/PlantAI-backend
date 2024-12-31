import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';
import { JwtUser, RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { GetPedidoUsuarioDto } from 'src/pedidos/dto/get-pedido.usuario.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ChangeRoleDto } from '../dto/change-rol-dto';
import { CreateDireccionDto } from '../dto/create-direccion.dto';
import { CreateGuestUsuarioDto } from '../dto/create-usuario-invitado.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Rol } from '../entities/rol.entity';
import { RolExistsPipe } from '../pipe/rol-exist.pipe';
import { ValidarCrearUsuarioPipe } from '../pipe/validar-crear-usuario.pipe';
import { ValidarUsuarioExistePipe } from '../pipe/validar-usuario-existe.pipe';
import { UsuariosService } from '../service/usuarios.service';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  // CONTROLADORES DE ADMINISTRADOR

  // Obtener todos los usuarios
  @ApiTags('Usuarios - Admin')
  @ApiOperation({ summary: 'Obtiene todos los Usuarios (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los usuarios registrados',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Usuarios obtenidos exitosamente.',
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(OutputUserDTO) },
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<GetDataDto<OutputUserDTO[]>> {
    const users = await this.usuariosService.findAll();
    return new GetDataDto(
      users,
      'Usuarios obtenidos exitosamente.',
      users.length,
    );
  }

  // Obtener coincidencias de usuario por rut
  @ApiTags('Usuarios - Admin')
  @ApiOperation({
    summary: 'Obtener usuarios que coincidan con el rut',
  })
  @ApiResponse({
    status: 200,
    description: 'Obtiene usuarios según rut',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Usuarios obtenidos exitosamente.',
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(OutputUserDTO) },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('rut/:rut')
  async findByRut(@Param('rut') rut: string): Promise<GetDataDto<OutputUserDTO[]>> {
    const users = await this.usuariosService.findByRut(rut);
    return new GetDataDto(
      users,
      'Usuarios obtenidos exitosamente.',
      users.length,
    );
  }

  // Obtener coincidencias de usuario por email
  @ApiTags('Usuarios - Admin')
  @ApiOperation({
    summary: 'Obtener usuarios que coincidan con el email',
  })
  @ApiResponse({
    status: 200,
    description: 'Obtiene usuarios según email',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Usuarios obtenidos exitosamente.',
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(OutputUserDTO) },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<GetDataDto<OutputUserDTO[]>> {
    const users = await this.usuariosService.findByEmail(email);
    return new GetDataDto(
      users,
      'Usuarios obtenidos exitosamente.',
      users.length,
    );
  }

  // Obtener coincidencias de usuario por nombre
  @ApiTags('Usuarios - Admin')
  @ApiOperation({
    summary: 'Obtener usuarios que coincidan con el nombre o apellido',
  })
  @ApiResponse({
    status: 200,
    description: 'Obtiene usuarios según nombre o apellido',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Usuarios obtenidos exitosamente.',
        },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(OutputUserDTO) },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<GetDataDto<OutputUserDTO[]>> {
    const users = await this.usuariosService.findByName(name)
    return new GetDataDto(
      users,
      'Usuarios obtenidos exitosamente.',
      users.length,
    );
  }

  //Modificar roles.
  @ApiTags('Usuarios - Admin')
  @ApiOperation({
    summary: 'Modifica el Rol de un usuario (Admin)',
    description: 'Solo Admin y Super Admin.'
  })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado exitosamente',
    type: OutputUserDTO,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':idUsuario/cambiar-rol')
  async cambiarRol(
    @Param('idUsuario', ParseIntPipe, ValidarUsuarioExistePipe) idUsuario: number,
    @Body() changeRoleDto: ChangeRoleDto,
    @Request() req: Request,
  ): Promise<OutputUserDTO> {
    const currentUser: JwtUser = req['user'];
    return await this.usuariosService.cambiarRol(
      idUsuario,
      changeRoleDto.idRol,
      currentUser,
    );
  }

  // Obtener un usuario según su ID
  @ApiTags('Usuarios - Admin')
  @ApiTags('Usuarios - Clientes')
  @ApiOperation({
    summary: 'Obtiene un Usuario según id. Permite a un cliente ver solo su información.',
    description: 'Un Super Admin y Admin pueden revisar cualquier id de usuario. Un cliente solo puede revisar la información que coincida con su id.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay un usuario con ese id',
  })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':idUsuario')
  async findById(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Request() request: Request
  ): Promise<OutputUserDTO> {
    const currentUser: JwtUser = request['user']
    return await this.usuariosService.findById(idUsuario, currentUser);
  }

  // Crear un usuario
  @ApiTags('Usuarios - Admin')
  @ApiOperation({ summary: 'Crea un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear usuario',
  })
  @ApiResponse({
    status: 400,
    description: 'El email ya está registrado',
  })
  @ApiResponse({
    status: 400,
    description: 'El nombre de usuario ya está registrado',
  })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin')
  @Post()
  async create(
    @Body('idRol', RolExistsPipe) rol: Rol,
    @Body(ValidarCrearUsuarioPipe) createUsuarioDTO: CreateUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.createUser(createUsuarioDTO, rol);
  }

  // Eliminar usuario
  @ApiTags('Usuarios - Admin')
  @ApiOperation({
    summary:
      'Elimina un usuario por ID. Los clientes sólo pueden autoeliminarse.',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado exitosamente',
    schema: {
      example: { message: 'Usuario con ID 1 eliminado con éxito' },
    },
  })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':idUsuario')
  async deleteOne(
    @Param('idUsuario', ParseIntPipe, ValidarUsuarioExistePipe) idUsuario: number,
    @Request() req: Request,
  ): Promise<{ message: string }> {
    const currentUser: JwtUser = req['user'];
    return await this.usuariosService.deleteUser(idUsuario, currentUser);
  }

  // CONTROLADORES DE CLIENTE

  // Usuarios - Clientes
  @ApiTags('Usuarios - Clientes')
  @ApiOperation({ summary: 'Actualiza la información del perfil (Cliente)' })
  @ApiResponse({
    status: 200,
    description: 'Perfil actualizado exitosamente',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 403,
    description: 'No puedes modificar el perfil de otro usuario',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put()
  async actualizarPerfil(
    @Request() req,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<OutputUserDTO> {
    const currentUser = req.user;
    return this.usuariosService.updateUserProfile(
      currentUser.id,
      updateUsuarioDto,
      currentUser,
    );
  }

  @ApiTags('Usuarios - Clientes')
  @ApiOperation({ summary: 'Cambia la contraseña (Cliente)' })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('cambiar-contrasena')
  async cambiarContrasena(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const currentUser = req.user;

    await this.usuariosService.cambiarContrasena(
      currentUser.id,
      changePasswordDto.nuevaContrasena,
    );

    return { message: 'Contraseña actualizada exitosamente' };
  }

  //Obtener pedidos de un usuario
  @ApiTags('Usuarios - Clientes')
  @ApiTags('Usuarios - Admin')
  @ApiExtraModels(GetPedidoUsuarioDto)
  @ApiOperation({ summary: 'Obtiene los pedidos de un usuario según ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los pedidos del usuario',
    schema: {
      type: 'object',
      properties: {
        totalItems: { type: 'number' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(GetPedidoUsuarioDto),
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al buscar los pedidos',
  })
  @ApiBearerAuth('access-token')
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pedidos/:idUsuario')
  async findPedidos(
    @Request() req,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ): Promise<GetDataDto<GetPedidoUsuarioDto[]>> {
    const currentUser = req.user;
    const pedidosUsuario = await this.usuariosService.findPedidos(
      currentUser,
      idUsuario,
    );
    return new GetDataDto(
      pedidosUsuario,
      `Pedidos del usuario con id ${idUsuario}`,
      pedidosUsuario.length,
    );
  }

  // Modificar o agregar medio de pago
  @ApiTags('Usuarios - Clientes')
  @ApiOperation({
    summary: 'Modifica o agrega el medio de pago de un usuario',
  })
  @ApiResponse({
    status: 204,
    type: MedioPago,
    description: 'Medio de pago modificado o creado',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al modificar el medio de pago',
  })
  @Patch('updateMedioPago/:idUsuario')
  async updateMedioPago(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Query('medioPago') medioPago: string,
  ) {
    const medioPagoEntity =
      await this.usuariosService.findMedioPagoByName(medioPago);
    if (!medioPagoEntity) {
      throw new BadRequestException(
        `El mediio pago "${medioPago}" no está registrado`,
      );
    }
    return await this.usuariosService.updateMedioPago(
      idUsuario,
      medioPagoEntity,
    );
  }

  //Obtener medios de pago de un usuario
  @ApiTags('Usuarios - Clientes')
  @ApiTags('Usuarios - Admin')
  @ApiOperation({ summary: 'Obtiene los métodos de pago de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la lista de métodos de pago de un usuario',
    type: [MedioPago],
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el usuario',
  })
  @Get(':idUsuario/metodos-pago')
  async findMediosPago(
    @Param('idUsuario', ParseIntPipe, ValidarUsuarioExistePipe)
    idUsuario: number,
  ): Promise<MedioPago[]> {
    return await this.usuariosService.findMedioPagoByUsuarioId(idUsuario);
  }

  //crear una dirección a un usuario
  @ApiTags('Usuarios - Clientes')
  @ApiOperation({ summary: 'Crea una dirección al usuario autenticado' })
  @ApiResponse({
    status: 201,
    description: 'Dirección creada'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBody({ type: CreateDireccionDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('direcciones')
  async createAddres(
    @Body() createDireccionDto: CreateDireccionDto,
    @Request() req,
  ) {
    const currentUser = req.user;
    return await this.usuariosService.createAddres(currentUser, createDireccionDto)
  }

  // CONTROLADORES DE Visitantes

  // Crear un usuario invitado
  @ApiTags('Usuarios - Visitantes')
  @ApiOperation({ summary: 'Crea un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear usuario',
  })
  @ApiResponse({
    status: 400,
    description: 'El email ya está registrado',
  })
  @ApiBody({ type: CreateGuestUsuarioDto })
  @Post('visitante')
  async createGuest(
    @Body(ValidarCrearUsuarioPipe) createGuestUsuarioDto: CreateGuestUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.createGuestUser(createGuestUsuarioDto);
  }

}
