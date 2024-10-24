import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductoDto } from 'src/productos/dto/producto/get-producto.dto';
import { CatalogoService } from '../service/catalogo.service';

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
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron los productos',
  })
  @Get()
  findAll() {
    return this.catalogoService.findAll();
  }

  // Obtener productos mas vendidos
  @ApiOperation({ summary: 'Obtener los productos más vendidos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos más vendidos',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Productos más vendidos no encontrados',
  })
  @Get('mas-vendidos')
  findBestSellers() {
    return this.catalogoService.findBestSellers();
  }

  // Obtener productos por puntuacion
  @ApiOperation({ summary: 'Obtener productos por puntuación' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos con la puntuación especificada',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Productos con la puntuación especificada no encontrados',
  })
  @ApiParam({
    name: 'puntuacion',
    description: 'Puntuación del producto en una escala del 1 al 10',
    example: 5,
  })
  @Get('puntuacion/:puntuacion')
  findByRating(@Param('puntuacion') puntuacion: number) {
    return this.catalogoService.findByRating(puntuacion);
  }

  // Obtener recomendados por historial
  @ApiOperation({ summary: 'Obtener productos recomendados por id usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos recomendados para el id entregado',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Productos recomendados no encontrados',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador del usuario',
    example: 1,
  })
  @Get('recomendados/:id')
  findRecommended(@Param('id') id: number) {
    return this.catalogoService.findRecommended(id);
  }

  //Filtrar productos por cota de precios
  @ApiOperation({ summary: 'Obtener productos por rango de precios' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos dentro del rango de precios',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Rangos de precios no válidos',
  })
  @Get('filtro-precio')
  filterbyPrice(
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
  ) {
    const min = +minPrice;
    const max = +maxPrice;
    return this.catalogoService.filterByPrice(min, max);
  }
}
