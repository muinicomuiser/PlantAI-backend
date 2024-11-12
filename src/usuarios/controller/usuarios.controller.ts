import {
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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
import { OutputPedidoDto } from 'src/pedidos/dto/output-pedido.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UsuariosService } from '../service/usuarios.service';

/**Historia de Usuario 3: Creación de usuarios y perfiles de compradores */
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  // Obtener todos los usuarios
  @ApiOperation({ summary: 'Obtiene los Usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los usuarios',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 418,
    description: 'No hay teteras registradas',
  })
  @Get()
  async findAll(): Promise<OutputUserDTO[]> {
    return await this.usuariosService.findAll();
  }

  // Obtener un usuario según su ID
  @ApiOperation({ summary: 'Obtiene un Usuario según ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay un usuario con ese id',
  })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<OutputUserDTO> {
    return await this.usuariosService.findById(id);
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
  @ApiBody({ type: CreateUsuarioDto })
  @Post()
  async create(
    @Body() createUsuarioDTO: CreateUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.createUser(createUsuarioDTO);
  }

  // Actualizar un usuario según el id
  @ApiOperation({ summary: 'Actualiza un usuario' })
  @ApiResponse({
    status: 204,
    description: 'Usuario actualizado',
    type: OutputUserDTO
  })
  @ApiResponse({
    status: 400,
    description: 'No se ha podido actualizar el usuario',
  })
  @ApiBody({ type: UpdateUsuarioDto })
  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.usuariosService.updateOne(id, updateUsuarioDto);
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
  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<{ message: string }> {
    return await this.usuariosService.deleteUser(id);
  }

  // Agregar un pedido
  @ApiOperation({ summary: 'Agrega un pedido a un usuario NO IMPLEMENTADO' })
  @ApiResponse({
    status: 201,
    description: 'Pedido añadido',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al añadir el pedido',
  })
  @Post('addPedido/:idUsuario')
  addPedido(
    @Body() pedido: CreatePedidoDto,
    @Param('idUsuario') idUsuario: number,
  ) {
    return this.usuariosService.addPedido(idUsuario, pedido);
  }

  //Obtener pedidos de usuario
  @ApiOperation({
    summary: 'Obtiene los pedidos realizados según usuario NO IMPLEMENTADO',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la lista de pedidos de un usuario',
  })
  @ApiResponse({
    status: 404,
    description: 'Error al buscar los pedidos',
  })
  @Get('pedidos/:idUsuario')
  findPedidos(@Param('idUsuario') idUsuario: number) {
    return this.usuariosService.findPedidos(idUsuario);
  }

  // Modificar medio de pago
  @ApiOperation({
    summary: 'Modifica el medio de pago de un usuario NO IMPLEMENTADO',
  })
  @ApiResponse({
    status: 204,
    description: 'Medio de pago modificado',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al modificar el medio de pago',
  })
  @ApiQuery({ name: 'Tipo de Pago' })
  @Patch('updateMedioPago/:idUsuario')
  updateMedioPago(
    @Param('idUsuario') idUsuario: number,
    @Query() medioPago: string,
  ) {
    return this.usuariosService.updateMedioPago(idUsuario, medioPago);
  }
}
