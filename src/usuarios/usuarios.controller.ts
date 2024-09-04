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
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tipoPago } from 'src/pedidos/entities/pago.enum';
import { OutputUserDTO } from './dto/output-userDTO';
import { OutputPedidoDto } from 'src/pedidos/dto/output-pedido.dto';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    /**Historia de Usuario 3: Creación de usuarios y perfiles de compradores */

    //Entrega los usuarios
    @ApiOperation({ summary: 'Obtiene los Usuarios' })
    @ApiResponse({
        status: 200,
        description: 'Devuelve todos los usuarios', type: OutputUserDTO
    })
    @ApiResponse({
        status: 404,
        description: 'No hay usuarios registrados'
    })
    @Get()
    findAll() {
        return this.usuariosService.findAll();
    }


    //Obtiene un usuario según su ID
    @ApiOperation({ summary: 'Obtiene un Usuario según ID' })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado', type: OutputUserDTO
    })
    @ApiResponse({
        status: 404,
        description: 'No hay un usuario con ese id'
    })
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usuariosService.findOne(id);
    }


    //Crear un usuario
    @ApiOperation({ summary: 'Crea un usuario' })
    @ApiResponse({
        status: 201,
        description: 'Usuario creado'
    })
    @ApiResponse({
        status: 400,
        description: 'Error al crear usuario'
    })
    @Post()
    createUser(@Body() usuario: CreateUsuarioDto) {
        return this.usuariosService.createUser(usuario);
    }


    //Actualiza un usuario según el id
    @ApiOperation({ summary: 'Actualiza un usuario' })
    @ApiResponse({
        status: 201,
        description: 'Usuario actualizado'
    })
    @ApiResponse({
        status: 400,
        description: 'No se ha podido actualizar el usuario'
    })
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() usuario: UpdateUsuarioDto) {
        return this.usuariosService.updateOne(id, usuario);
    }


    //Elimina un usuario según el id
    @ApiOperation({ summary: 'Elimina un usuario según su id' })
    @ApiResponse({
        status: 200,
        description: 'Usuario eliminado'
    })
    @ApiResponse({
        status: 404,
        description: 'No existe un usuario con ese id'
    })
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.usuariosService.deleteOne(id)
    }




    //Actualizar o modificar carro de un usuario
    //LLAMAR A CARRO SERVICE
    @ApiOperation({ summary: 'Actualiza el carro de un usuario' })
    @ApiResponse({
        status: 201,
        description: 'Carro actualizado'
    })
    @ApiResponse({
        status: 400,
        description: 'Error al actualizar el carro'
    })
    @Patch('updateCarro/:idUsuario/')
    updateCarro(@Param('idUsuario') idUsuario: number, @Body() carro: UpdateCarroCompraDto) {
        return this.usuariosService.updateCarro(idUsuario, carro);
    }


    //AGREGAR PEDIDO
    @ApiOperation({ summary: 'Agrega un pedido a un usuario' })
    @ApiResponse({
        status: 201,
        description: 'Pedido añadido'
    })
    @ApiResponse({
        status: 400,
        description: 'Error al añadir el pedido'
    })
    @Post('addPedido/:idUsuario')
    addPedido(@Body() pedido: CreatePedidoDto, @Param('idUsuario') idUsuario: number) {
        return this.usuariosService.addPedido(idUsuario, pedido);
    }


    //OBTENER PEDIDOS
    @ApiOperation({ summary: 'Obtiene los pedidos realizados según usuario' })
    @ApiResponse({
        status: 200,
        description: 'Devuelve la lista de pedidos de un usuario', type: OutputPedidoDto
    })
    @ApiResponse({
        status: 404,
        description: 'Error al buscar los pedidos'
    })
    @Get('pedidos/:idUsuario')
    findPedidos(@Param('idUsuario') idUsuario: number) {
        return this.usuariosService.findPedidos(idUsuario);
    }


    //MODIFICAR MEDIO DE PAGO
    @ApiOperation({ summary: 'Modifica el medio de pago de un usuario' })
    @ApiResponse({
        status: 201,
        description: 'Medio de pago modificado'
    })
    @ApiResponse({
        status: 400,
        description: 'Error al modificar el medio de pago'
    })
    @ApiQuery({ name: 'Tipo de Pago', enum: tipoPago })
    @Patch('updateMedioPago/:idUsuario')
    updateMedioPago(@Param('idUsuario') idUsuario: number, @Query() medioPago: tipoPago) {
        return this.usuariosService.updateMedioPago(idUsuario, medioPago);
    }
}
