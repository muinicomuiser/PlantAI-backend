import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductosService } from '../service/productos.service';
import { GetProductoDto } from '../dto/producto/get-producto.dto';

import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';

/**Historia de Usuario 5: Implementación de "gestión de productos" Administrador */
/**Historia de Usuario 7: Búsqueda de Productos */
@ApiTags('Gestión de productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Obtener producto por id
  @ApiOperation({ summary: 'Busca un producto por su id' })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto que coincida con el id.',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra un producto registrado con ese id',
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetProductoDto> {
    return await this.productosService.getById(+id);
  }

  // Obtener todos los productos
  // Filtrar por (nombre, familia, fotoperiodo, tipoRiego, petFriendly, color)
  @ApiOperation({ summary: 'Busca productos por filtros.' })
  @ApiResponse({
    status: 200,
    description:
      'Devuelve todos los productos que coincidan con los parámetros. Si no hay parámetros, los devuelve todos.',
    type: GetProductoDto,
  })
  @ApiQuery({ name: 'nombre', required: false })
  @ApiQuery({ name: 'familia', required: false })
  @ApiQuery({ name: 'fotoperiodo', required: false })
  @ApiQuery({ name: 'tiporiego', required: false })
  @ApiQuery({ name: 'petfriendly', enum: ['true', 'false'], required: false })
  @ApiQuery({ name: 'color', required: false })
  @Get()
  getByFilters(
    @Query('nombre') nombre: string,
    @Query('familia') familia: string,
    @Query('fotoperiodo') fotoperiodo: string,
    @Query('tiporiego') tipoRiego: string,
    @Query('petfriendly') petFriendly: string,
    @Query('color') color: string,
  ) {
    return this.productosService.getByFilters();
  }

  // Crear un producto
  @ApiOperation({ summary: 'Crea un producto.' })
  @ApiResponse({
    status: 200,
    description: 'Agrega un producto al sistema.',
  })
  @ApiResponse({
    status: 400,
    description: 'No ha sido posible crear el producto',
  })
  @Post()
  createProduct(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  // Actualizar un producto
  @ApiOperation({ summary: 'Actualiza un producto.' })
  @ApiResponse({
    status: 200,
    description: 'Actualiza un producto.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado un producto con ese id.',
  })
  @ApiParam({ name: 'id', type: Number })
  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  // Eliminar un producto
  @ApiOperation({ summary: 'Elimina un producto según su id' })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un producto con ese id',
  })
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productosService.deleteOne(id);
  }
}
