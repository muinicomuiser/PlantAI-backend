import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    Query,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Response } from 'express';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { estadoPedido } from './entities/estado.enum';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) {}

    /**Historia de Usuario 10: Proceso de Checkout y Confirmación de Pedidos*/
    //crear pedido
    @ApiResponse({ status: 200, description: 'Pedido creado con éxito' })
    @ApiResponse({ status: 400, description: 'Problemas para crear el pedido' })
    @Post()
    create(@Body() createPedidoDTO: CreatePedidoDto, @Res() res: Response) {
        const result = this.pedidosService.create();
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(400).send({ error: 'error al crear pedido' });
        }
    }
    // Entrega todos los pedidos, permite filtrar por estado
    @ApiQuery({ name: 'Estado', enum: estadoPedido, required: false })
    @Get()
    findAll(@Query('Estado') estado: estadoPedido, @Res() res: Response) {
        const result = this.pedidosService.findAll();
        res.json({ message: result });
    }

    //entrega pedidos por id pedidos
    @ApiResponse({ status: 200, description: 'pedido encotrado' })
    @ApiResponse({ status: 404, description: 'pedido no encotrado' })
    @Get('id')
    findOne(@Param('id') id: number, @Res() res: Response) {
        const result = this.pedidosService.findOne(+id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ error: 'el pedido no existe' });
        }
    }
    //modifica un pedido
    @ApiResponse({ status: 200, description: 'pedido modificado' })
    @ApiResponse({ status: 404, description: 'pedido no encotrado' })
    @Patch('id')
    update(
        @Param('id') id: number,
        @Body() updatePedidoDto: UpdatePedidoDto,
        @Res() res: Response,
    ) {
        const result = this.pedidosService.update(+id, updatePedidoDto);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ error: 'el pedido no existe' });
        }
    }
}
