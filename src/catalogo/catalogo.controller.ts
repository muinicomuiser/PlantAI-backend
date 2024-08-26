import { Controller, Get, Param } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Catálogo')
@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  /**Historia de Usuario 12: Visualización del catálogo*/

  //Entrega la descripción de la épica visualización

  //obtener todos los productos del catálogo
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos del catálogo',
  })
  @ApiResponse({ status: 404, description: 'No se encontraron los productos' })
  @ApiOperation({ summary: 'Obtener todos los productos del catálogo' })
  @Get()
  findAll() {
    return this.catalogoService.findAll();
  }

  //obtener productos mas vendidos del catálogo
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos más vendidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Productos más vendidos no encontrados',
  })
  @ApiOperation({ summary: 'Obtener los productos más vendidos' })
  @Get('mas-vendidos')
  findBestSellers() {
    return this.catalogoService.findBestSellers();
  }

  //obtener productos por puntuacion
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos con la puntuación especificada',
  })
  @ApiResponse({
    status: 404,
    description: 'Productos con la puntuación especificada no encontrados',
  })
  @ApiOperation({ summary: 'Obtener productos por puntuación' })
  @ApiParam({
    name: 'puntuacion',
    description: 'Puntuación del producto en una escala del 1 al 10',
    example: 5,
  })
  @Get('puntuacion/:puntuacion')
  findByRating(@Param('puntuacion') puntuacion: number) {
    return this.catalogoService.findByRating(puntuacion);
  }

  //obtener recomendados por historial\
  @ApiResponse({
    status: 200,
    description: 'Retorna los productos recomendados para el id entregado',
  })
  @ApiResponse({
    status: 404,
    description: 'Productos recomendados no encontrados',
  })
  @ApiOperation({ summary: 'Obtener productos recomendados por id usuario' })
  @ApiParam({
    name: 'id',
    description: 'Identificador del usuario',
    example: 1,
  })
  @Get('recomendados/:id')
  findRecommended(@Param('id') id: number) {
    return this.catalogoService.findRecommended(id);
  }
}
