import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductoDto } from 'src/productos/dto/producto/get-producto.dto';
import { CatalogoService } from '../service/catalogo.service';
import {
  FiltrosCatalogoDto,
  SearchCatalogoDto,
} from '../dto/catalogo/paginacion.dto';

/**Historia de Usuario 12: Visualización del catálogo*/
@ApiTags('Catálogo')
@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  // Obtener todos los productos
  @ApiOperation({ summary: 'Obtener todos los productos del catálogo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos del catálogo',
    type: GetProductoDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron los productos',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Cantidad de elementos por página',
  })
  @Get()
  findAll(@Query() filtrosCatalogoDto: FiltrosCatalogoDto) {
    return this.catalogoService.findAll(filtrosCatalogoDto);
  }

  // obtener catalogo por search
  @ApiOperation({ summary: 'Obtener productos del catálogo por búsqueda' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos del catálogo por búsqueda',
    type: GetProductoDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron los productos',
  })
  @Get('search')
  findBySearch(@Query() searchCatalogoDto: SearchCatalogoDto) {
    return this.catalogoService.findBySearch(searchCatalogoDto);
  }
}
