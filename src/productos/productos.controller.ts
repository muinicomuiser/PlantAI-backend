import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FotoPeriodo, TipoRiego } from './entities/categorias';
import { ProductoSalidaDto } from './dto/producto-salida.dto';

/**Historia de Usuario 7: Búsqueda de Productos*/
@ApiTags('Búsqueda de productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Obtener por id
  @ApiOperation({ summary: 'Busca un producto por su id' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto que coincida con el id.',
    type: ProductoSalidaDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra un producto registrado con ese id',
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productosService.getById(+id);
  }

  // Obtener todos los productos
  // Obtener por filtros (nombre, familia, fotoperiodo, tipoRiego, petFriendly, color)
  @ApiOperation({ summary: 'Busca productos por filtros.' })
  @ApiResponse({
    status: 200,
    description:
      'Devuelve todos los productos que coincidan con los parámetros. Si no hay parámetros, los devuelve todos.',
    type: ProductoSalidaDto,
  })
  @ApiQuery({ name: 'nombre', required: false })
  @ApiQuery({ name: 'familia', required: false })
  @ApiQuery({ name: 'fotoperiodo', enum: FotoPeriodo, required: false })
  @ApiQuery({ name: 'tiporiego', enum: TipoRiego, required: false })
  @ApiQuery({ name: 'petfriendly', enum: ['true', 'false'], required: false })
  @ApiQuery({ name: 'color', required: false })
  @Get()
  getByFilters(
    @Query('nombre') nombre: string,
    @Query('familia') familia: string,
    @Query('fotoperiodo') fotoperiodo: FotoPeriodo,
    @Query('tiporiego') tipoRiego: TipoRiego,
    @Query('petfriendly') petFriendly: string,
    @Query('color') color: string,
  ) {
    return this.productosService.getByFilters();
  }
}

// Servicios
// Obtener todos los productos
// Obtener por id
// Obtener por filtros (nombre, familia, fotoperiodo, tipoRiego, petFriendly, color)
