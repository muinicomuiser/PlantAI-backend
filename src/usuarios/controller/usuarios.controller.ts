import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsuariosService } from '../service/usuarios.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';

/**Historia de Usuario 3: Creación de usuarios y perfiles de compradores */
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Obtener todos los usuarios
  @ApiOperation({ summary: 'Obtiene los Usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los usuarios',
    type: OutputUserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay usuarios registrados',
  })
  @Get()
  findAll() {
    return this.usuariosService.findAll();
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
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  // Crear un usuario
  @ApiOperation({ summary: 'Crea un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear usuario',
  })
  @Post()
  createUser(@Body() usuario: CreateUsuarioDto) {
    return this.usuariosService.createUser(usuario);
  }

  // Actualizar un usuario según el id
  @ApiOperation({ summary: 'Actualiza un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario actualizado',
  })
  @ApiResponse({
    status: 400,
    description: 'No se ha podido actualizar el usuario',
  })
  @Put(':id')
  updateOne(@Param('id') id: number, @Body() usuario: UpdateUsuarioDto) {
    return this.usuariosService.updateOne(id, usuario);
  }

  // Eliminar un usuario según el id
  @ApiOperation({ summary: 'Elimina un usuario según su id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un usuario con ese id',
  })
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.usuariosService.deleteOne(id);
  }

  // Actualizar o modificar carro de un usuario
  @ApiOperation({ summary: 'Actualiza el carro de un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Carro actualizado',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar el carro',
  })
  @Patch('updateCarro/:idUsuario/')
  updateCarro(
    @Param('idUsuario') idUsuario: number,
    @Body() carro: UpdateCarroCompraDto,
  ) {
    return this.usuariosService.updateCarro(idUsuario, carro);
  }

  // Agregar un pedido
  @ApiOperation({ summary: 'Agrega un pedido a un usuario' })
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
  @ApiOperation({ summary: 'Obtiene los pedidos realizados según usuario' })
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
  @ApiOperation({ summary: 'Modifica el medio de pago de un usuario' })
  @ApiResponse({
    status: 201,
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
