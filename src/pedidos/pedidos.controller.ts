import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { estadoPedido } from './entities/estado.enum';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { OutputPedidoDto } from './dto/output-pedido.dto';
@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }

  /**Historia de Usuario 10: Proceso de Checkout y Confirmación de Pedidos*/
  //crear pedido
  @ApiOperation({ summary: 'Crea un pedido' })
  @ApiResponse({ status: 200, description: 'Pedido creado con éxito' })
  @ApiResponse({ status: 400, description: 'Problemas para crear el pedido' })
  @Post()
  create(@Body() createPedidoDTO: CreatePedidoDto) {
    return this.pedidosService.create();
  }


  // Entrega todos los pedidos, permite filtrar por estado
  @ApiOperation({ summary: 'Filtra pedidos por estado o entrega todos los pedidos' })
  @ApiQuery({ name: 'Estado', enum: estadoPedido, required: false })
  @ApiResponse({ description: "Pedidos filtrados por estado o todos los pedidos", type: OutputPedidoDto })
  @Get()
  findAll(@Query('Estado') estado: estadoPedido) {
    return this.pedidosService.findAll();
  }


  //entrega pedidos por id pedidos
  @ApiOperation({ summary: 'Busca pedidos por id' })
  @ApiResponse({ status: 200, description: 'Pedido encotrado', type: OutputPedidoDto })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(+id);
  }


  //modifica un pedido
  @ApiOperation({ summary: 'Modifica pedidos por id' })
  @ApiResponse({ status: 200, description: 'Pedido modificado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePedidoDto: UpdatePedidoDto
  ) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }
}
