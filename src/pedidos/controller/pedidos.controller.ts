import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { PedidosService } from '../service/pedidos.service';
import { DeletePedidoResponseDto } from '../dto/delete-pedido.dto';

/**Historia de Usuario 10: Proceso de Checkout y Confirmación de Pedidos*/
@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Crear pedido
  @ApiOperation({ summary: 'Crea un pedido' })
  @ApiResponse({
    status: 200,
    description: 'Pedido creado con éxito',
    type: GetPedidoDto,
  })
  @ApiResponse({ status: 400, description: 'Problemas para crear el pedido' })
  @Post()
  create(@Body() createPedidoDTO: CreatePedidoDto): Promise<GetPedidoDto> {
    return this.pedidosService.create(createPedidoDTO);
  }

  // Obtener todos los pedidos
  // Filtrar por estado
  @ApiOperation({
    summary: 'Filtra pedidos por estado o entrega todos los pedidos',
  })
  @ApiQuery({ name: 'Estado', required: false })
  @ApiResponse({
    status: 200,
    description: 'Pedidos filtrados por estado o todos los pedidos',
    type: GetPedidoDto,
  })
  @Get()
  findAll(@Query('Estado') estado: string): Promise<GetPedidoDto[]> {
    return this.pedidosService.findAll();
  }

  // Obtener pedidos por id
  @ApiOperation({ summary: 'Busca pedidos por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido encotrado',
    type: GetPedidoDto,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<GetPedidoDto> {
    return this.pedidosService.findOne(+id);
  }

  // Modificar un pedido
  @ApiOperation({ summary: 'Modifica pedidos por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido modificado',
    type: GetPedidoDto,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ): Promise<GetPedidoDto> {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  // Eliminar un pedido
  @ApiOperation({ summary: 'Elimina pedidos por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido eliminado',
    type: DeletePedidoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeletePedidoResponseDto> {
    return this.pedidosService.remove(+id);
  }
}
