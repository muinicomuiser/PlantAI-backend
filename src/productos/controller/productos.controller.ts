import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductosService } from '../service/productos.service';
import { GetProductoDto } from '../dto/producto/get-producto.dto';

import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { ProductoExistentePipe } from 'src/carro-compras/pipe/validar-producto-existente.pipe';
import { UpdateProductImageDto } from '../dto/producto/update-product-image.dto';
import { ValidarBase64Pipe } from '../pipe/validar-base64.pipe';

/**Historia de Usuario 5: Implementación de "gestión de productos" Administrador */
/**Historia de Usuario 7: Búsqueda de Productos */
@ApiTags('Gestión de productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

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
  // @ApiOperation({ summary: 'Busca productos por filtros.' })
  // @ApiResponse({
  //   status: 200,
  //   description:
  //     'Devuelve todos los productos que coincidan con los parámetros. Si no hay parámetros, los devuelve todos.',
  //   type: GetProductoDto,
  // })
  // @ApiQuery({ name: 'nombre', required: false })
  // @ApiQuery({ name: 'familia', required: false })
  // @ApiQuery({ name: 'fotoperiodo', required: false })
  // @ApiQuery({ name: 'tiporiego', required: false })
  // @ApiQuery({ name: 'petfriendly', enum: ['true', 'false'], required: false })
  // @ApiQuery({ name: 'color', required: false })
  // @Get()
  // getByFilters(
  //   @Query('nombre') nombre: string,
  //   @Query('familia') familia: string,
  //   @Query('fotoperiodo') fotoperiodo: string,
  //   @Query('tiporiego') tipoRiego: string,
  //   @Query('petfriendly') petFriendly: string,
  //   @Query('color') color: string,
  // ) {
  //   return this.productosService.getByFilters();
  // }

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
  @ApiBody({ type: CreateProductoDto })
  @Post()
  createProduct(
    @Body(ValidarBase64Pipe) createProductoDto: CreateProductoDto,
  ): Promise<GetProductoDto> {
    return this.productosService.create(createProductoDto);
  }

  // Actualizar un producto
  @ApiOperation({ summary: 'Actualiza un producto.' })
  @ApiBody({ type: UpdateProductoDto })
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
    @Param('id', ProductoExistentePipe) id: number,
    @Body(ValidarBase64Pipe) updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
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
  deleteOne(
    @Param('id', ProductoExistentePipe) id: number,
  ): Promise<GetProductoDto> {
    return this.productosService.deleteOne(id);
  }

  //Subir imagen en bas64 a un producto
  @ApiOperation({ summary: 'Sube una imagen a servidor de estáticos y guarda la ruta en la DB' })
  @ApiResponse({ status: 201, description: 'Imagen subida con éxito' })
  @ApiResponse({ status: 400, description: 'Error al subir imagen' })
  @ApiBody({ type: Object })

  @Post('addProductImage/:idProducto')
  @ApiBody({ type: UpdateProductImageDto })
  async addProductImage(@Body() base64Content: UpdateProductImageDto, @Param('idProducto', ParseIntPipe, ProductoExistentePipe) idProducto: number) {
    return await this.productosService.addProductImage(base64Content, idProducto);
  }

  @ApiBody({ type: UpdateProductImageDto })
  @Patch('updateProductImage/:idProducto')
  async updateProductImage(@Body() base64Content: UpdateProductImageDto, @Param('idProducto', ParseIntPipe, ProductoExistentePipe) idProducto: number) {
    return await this.productosService.updateProductImage(base64Content, idProducto);
  }

  @Delete('deleteProductImage/:idProducto')
  async deleteProductImage(@Param('idProducto', ParseIntPipe, ProductoExistentePipe) idProducto: number) {
    return await this.productosService.deleteProductImage(idProducto);
  }
}
