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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { RemoveInvisibleCharsInterceptor } from 'src/commons/interceptor/remove-invisible-chars.interceptor';
import { SanitizeInputInterceptor } from 'src/commons/interceptor/sanitize-create-usuario.interceptor';
import { GetPedidoUsuarioDto } from 'src/pedidos/dto/get-pedido.usuario.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Rol } from '../entities/rol.entity';
import { RolExistsPipe } from '../pipe/rol-exist.pipe';
import { ValidarCrearUsuarioPipe } from '../pipe/validar-crear-usuario.pipe';
import { ValidarUsuarioExistePipe } from '../pipe/validar-usuario-existe.pipe';
import { UsuariosService } from '../service/usuarios.service';
import { RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';
import { CreateGuestUsuarioDto } from '../dto/create-usuario-invitado.dto';

/**Historia de Usuario 3: Creación de usuarios y perfiles de compradores */
@ApiTags('Usuarios')
@ApiBearerAuth('access-token')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Obtener todos los usuarios
  @ApiOperation({ summary: 'Obtiene los Usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los usuarios',
    // Esto es para construir el ejemplo en Swagger, porque la data es tipo genérico
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(OutputUserDTO),
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado',
  })
  @Get()
  @UseGuards(RolesGuard)
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // async findAll(): Promise<{ data: OutputUserDTO[]; message: string }> {
  async findAll(): Promise<GetDataDto<OutputUserDTO[]>> {
    const users = await this.usuariosService.findAll();
    return new GetDataDto(
      users,
      'Usuarios obtenidos exitosamente.',
      users.length,
    );
  }

  // Obtener un usuario según su ID
  @ApiOperation({ summary: 'Obtiene un Usuario según id.' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay un usuario con ese id',
  })
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':idUsuario')
  async findById(
    //validar que el cliente sólo puede ver si información
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.findById(idUsuario);
  }

  // Crear un usuario
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
  @Roles('Super Admin', 'Admin')
  @Post()
  async create(
    @Body('idRol', RolExistsPipe) rol: Rol,
    @Body(ValidarCrearUsuarioPipe) createUsuarioDTO: CreateUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.createUser(createUsuarioDTO, rol);
  }

  // Actualizar un usuario según el id
  @ApiOperation({ summary: 'Actualiza un usuario según su id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'No se ha podido actualizar el usuario',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o rol no encontrado',
  })
  @ApiBody({ type: UpdateUsuarioDto })
  @Put(':idUsuario')
  @UseInterceptors(SanitizeInputInterceptor, RemoveInvisibleCharsInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Admin')
  async updateOne(
    @Param('idUsuario', ParseIntPipe, ValidarUsuarioExistePipe)
    idUsuario: number,
    @Body(ValidarCrearUsuarioPipe) updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<OutputUserDTO> {
    const updatedUser = await this.usuariosService.updateOne(
      idUsuario,
      updateUsuarioDto,
    );

    /****Comentado para aplicarlo después de la entrega 11, pa no descalibrarle a Front el uso del endpoint tan encima. */
    // const respuesta = {
    //   status: 200,
    //   message: 'Usuario actualizado exitosamente',
    //   data: updatedUser,
    //   timestamp: new Date().toISOString(),
    // };
    /********** */
    return updatedUser;
  }
  // Eliminar un usuario según el id
  @ApiOperation({ summary: 'Elimina un usuario según su id' })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado',
    schema: {
      example: { message: 'Usuario con ID 1 eliminado con éxito' },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un usuario con ese id',
  })
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':idUsuario')
  //en el caso del cliente autoeliminarse. No eliminar otros
  async deleteOne(
    @Param('idUsuario') idUsuario: number,
  ): Promise<{ message: string }> {
    return await this.usuariosService.deleteUser(idUsuario);
  }

  //Obtener pedidos de usuario
  @ApiExtraModels(GetPedidoUsuarioDto)
  @ApiOperation({
    summary: 'Obtiene los pedidos de un usuario según ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los usuarios',
    // Esto es para construir el ejemplo en Swagger, porque la data es tipo genérico
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
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'idUsuario', required: false })
  @Get('pedidos/:idUsuario')
  async findPedidos(
    //en caso de cliente sólo buscar pedidos de sí mismo
    @Request() req,
    @Param('idUsuario', /* ParseIntPipe, */ ValidarUsuarioExistePipe)
    idUsuario?: number,
  ): Promise<GetDataDto<GetPedidoUsuarioDto[]>> {
    const user = req.user;
<<<<<<< HEAD
    // console.log(user);
    const pedidosUsuario: GetPedidoUsuarioDto[] =
      await this.usuariosService.findPedidos(user, idUsuario);
    // console.log(pedidosUsuario);
=======
    console.log(user);
    const pedidosUsuario: GetPedidoUsuarioDto[] =
      await this.usuariosService.findPedidos(user, idUsuario);
    console.log(pedidosUsuario);
>>>>>>> 5d037afef55af5de9f687414e41c97036d8c3cca
    return new GetDataDto(
      pedidosUsuario,
      `Pedidos del usuario con id ${idUsuario}`,
      pedidosUsuario.length,
    );
  }

  // Modificar o agregar medio de pago
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

  // Crear un usuario
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
  @ApiBody({ type: CreateGuestUsuarioDto })
  @Post('invitado')
  async createGuest(
    @Body(ValidarCrearUsuarioPipe) createGuestUsuarioDto: CreateGuestUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.createGuestUser(createGuestUsuarioDto);
  }
}
