import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { PedidosService } from '../service/pedidos.service';
import { DeletePedidoResponseDto } from '../dto/delete-pedido.dto';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';
import { ValidarCarroLlenoPipe } from '../pipe/validar-carro-lleno.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';

/**Historia de Usuario 10: Proceso de Checkout y Confirmación de Pedidos*/
@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }

  // Crear pedido
  @ApiOperation({ summary: 'Crea un pedido a partir de un carro de compras. CONFIRMAR PEDIDO / PAGO' })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado con éxito',
    type: GetPedidoDto,
  })
  @ApiResponse({ status: 400, description: 'Problemas para crear el pedido' })
  @ApiBearerAuth('access-token')
  @Post(':idUsuario')
  @Roles('Visitante', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Param('idUsuario', ValidarUsuarioExistePipe, ValidarCarroLlenoPipe) idUsuario: number, @Body() createPedidoDTO: CreatePedidoDto): Promise<GetPedidoDto> {
    return await this.pedidosService.create(+idUsuario, createPedidoDTO);
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
    type: [GetPedidoDto],
  })
  @ApiBearerAuth('access-token')
  @Get()
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query('Estado') estado: string): Promise<GetPedidoDto[]> {
    throw new ServiceUnavailableException('Servicio en mantención')
    // return await this.pedidosService.findAll();
  }

  // Obtener pedidos por id
  @ApiOperation({ summary: 'Busca pedidos por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido encotrado',
    type: GetPedidoDto,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiBearerAuth('access-token')
  @Get(':id')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: number): Promise<GetPedidoDto> {
    throw new ServiceUnavailableException('Servicio en mantención')
    // return this.pedidosService.findOne(+id);
  }

  // Modificar un pedido
  //***Re desarrollar para ajustar a la estructura nueva de Pedido*/
  @ApiOperation({ summary: 'Modifica pedidos por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido modificado',
    type: GetPedidoDto,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    throw new ServiceUnavailableException('Servicio en mantención')
    // return this.pedidosService.update(+id, updatePedidoDto);
  }

  // Eliminar un pedido
  @ApiOperation({ summary: 'Elimina pedidos por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido eliminado',
    type: DeletePedidoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: number): Promise<DeletePedidoResponseDto> {
    throw new ServiceUnavailableException('Servicio en mantención')
    // return this.pedidosService.remove(+id);
  }
}
