import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    Put,
    Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';
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
    @ApiResponse({ status: 200, description: 'User found', type: OutputUserDTO })
    @ApiResponse({ status: 404, description: 'Users not found' })
    @Get()
    findAll(@Res() res: Response) {
        const result = this.usuariosService.findAll();
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: 'Sin resultados' });
        }
    }
    @ApiOperation({ summary: 'Obtiene un Usuario según ID' })
    @ApiResponse({ status: 200, description: 'User found', type: OutputUserDTO })
    @ApiResponse({ status: 404, description: 'User not found' })
    //Obtiene un usuario según su ID
    @Get(':id')
    findOne(@Param('id') id: number, @Res() res: Response) {
        const found = this.usuariosService.findOne(id);

        if (found) {
            res.status(200).send(found);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }

    @ApiOperation({ summary: 'Crea un usuario' })
    @ApiResponse({ status: 201, description: 'Created user' })
    @ApiResponse({ status: 400, description: 'Error' })
    //Crear un usuario
    @Post()
    createUser(@Body() usuario: CreateUsuarioDto) {
        return this.usuariosService.createUser(usuario);
    }

    @ApiOperation({ summary: 'Actualiza un usuario' })
    @ApiResponse({ status: 201, description: 'Updated user' })
    @ApiResponse({ status: 400, description: 'Error' })
    //Actualiza un usuario según el id
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() usuario: UpdateUsuarioDto) {
        return this.usuariosService.updateOne(id, usuario);
    }

    @ApiOperation({ summary: 'Elimina un usuario según su id' })
    @ApiResponse({ status: 200, description: 'Deleted user' })
    @ApiResponse({ status: 400, description: 'Error' })
    //Elimina un usuario según el id
    @Delete(':id')
    deleteOne(@Param('id') id: number, @Res() res: Response) {
        const deleted = this.usuariosService.deleteOne(id)
        if (deleted) {
            // res.status(200).send(deleted);
            res.status(200).send({ message: 'Deleted user' });
        } else {
            res.status(400).send({ message: 'Error' });
        }
    }
    @ApiOperation({ summary: 'Actualiza el carro de un usuario' })
    @ApiResponse({ status: 201, description: 'Updated carro' })
    @ApiResponse({ status: 400, description: 'Error' })
    //Actualizar o modificar carro de un usuario
    //LLAMAR A CARRO SERVICE
    @Patch('updateCarro/:idUsuario/')
    updateCarro(@Param('idUsuario') idUsuario: number, @Body() carro: UpdateCarroCompraDto, @Res() res: Response) {
        const carrito = this.usuariosService.updateCarro(idUsuario, carro);
        if (carrito) {
            res.status(201).send(carrito);
        } else {
            res.status(400).send({ message: 'Error' });
        }
    }

    //AGREGAR PEDIDO
    @ApiOperation({ summary: 'Agrega un pedido a un usuario' })
    @ApiResponse({ status: 201, description: 'Pedido añadido' })
    @ApiResponse({ status: 400, description: 'Error' })
    @Post('addPedido/:idUsuario')
    addPedido(@Body() pedido: CreatePedidoDto, @Param('idUsuario') idUsuario: number, @Res() res: Response) {
        const pedidoAdded = this.usuariosService.addPedido(idUsuario, pedido);
        if (pedidoAdded) {
            res.status(201).send(pedidoAdded);
        } else {
            res.status(400).send({ message: 'Error' })
        }
    }
    //OBTENER PEDIDOS
    @ApiOperation({ summary: 'Obtiene los pedidos realizados según usuario' })
    @ApiResponse({ status: 200, description: 'Pedidos list', type: OutputPedidoDto })
    @ApiResponse({ status: 404, description: 'Pedidos not found' })
    @Get('pedidos/:idUsuario')
    findPedidos(@Param('idUsuario') idUsuario: number, @Res() res: Response) {
        const pedidosUsuario = this.usuariosService.findPedidos(idUsuario);
        if (pedidosUsuario) {
            res.status(200).send(pedidosUsuario);
        } else {
            res.status(404).send({ message: 'No tiene pedidos registrados' });
        }
    }
    //MODIFICAR MEDIO DE PAGO
    @ApiOperation({ summary: 'Modifica el medio de pago de un usuario' })
    @ApiResponse({ status: 201, description: 'Medio de pago modificado' })
    @ApiResponse({ status: 400, description: 'Error' })
    @ApiQuery({ name: 'Tipo de Pago', enum: tipoPago })
    @Patch('updateMedioPago/:idUsuario')
    updateMedioPago(@Param('idUsuario') idUsuario: number, @Query() medioPago: tipoPago, @Res() res: Response) {
        const tipoPagoEditado = this.usuariosService.updateMedioPago(idUsuario, medioPago);

        if (tipoPagoEditado) {
            res.status(201).send(tipoPagoEditado);
        } else {
            res.status(400).send({ message: 'Error' });
        }
    }

}
