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
  ServiceUnavailableException,
} from '@nestjs/common';

import {
  ApiBody,
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
import { ProductoExistentePipe } from 'src/carro-compras/pipe/validar-producto-existente.pipe';
import { UpdateProductImageDto } from '../dto/producto/update-product-image.dto';
import { ValidarBase64Pipe } from '../pipe/validar-base64.pipe';
import { ValidarPropiedadesProductoPipe } from '../pipe/validar-propiedades-producto.pipe';
import { ValidarImagenProductoExistePipe } from '../pipe/validar-imagen-producto-existe.pipe';
import { ValidarCategoriaProductoPipe } from '../pipe/validar-categoria-producto.pipe';
import { GetProductosAdminDto } from '../dto/producto/get-paginacion-admin.dto';
import { PaginacionDto } from '../dto/catalogo/paginacion.dto';

/**Historia de Usuario 5: Implementación de "gestión de productos" Administrador */
/**Historia de Usuario 7: Búsqueda de Productos */
@ApiTags('Gestión de productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @ApiOperation({
    summary: 'Retorna todos los productos registrados. PREFERIR GET productos/admin para paginación.',
    description:
      'Ahora está habilitado el GET productos/admin, que retorna todos los productos y permite paginar.'
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos',
    type: [GetProductoDto],
  })
  @Get()
  async findAll(): Promise<GetProductoDto[]> {
    return this.productosService.getAll();
  }

  @ApiOperation({ summary: 'Retorna todos los productos registrados paginados.' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Cantidad de elementos por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos',
    type: GetProductosAdminDto,
  })
  @Get('admin')
  async findAllPaginated(
    @Query('page')
    page?: number,
    @Query('pageSize')
    pageSize?: number,
  ): Promise<GetProductosAdminDto> {

    console.log(page, pageSize)
    const paginacionDto: PaginacionDto = {
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 10
    };
    return await this.productosService.findAllPaginated(paginacionDto);
  }

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

  // Crear un producto
  @ApiOperation({
    summary:
      'Crea un producto.',
    description:
      'Crea un producto nuevo. Permite agregar una imagen nueva.'
  })
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
    @Body(
      ValidarBase64Pipe,
      ValidarCategoriaProductoPipe,
      ValidarPropiedadesProductoPipe,
    )
    createProductoDto: CreateProductoDto,
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
    @Body(
      ValidarBase64Pipe,
      ValidarCategoriaProductoPipe,
      ValidarPropiedadesProductoPipe,
    )
    updateProductoDto: UpdateProductoDto,
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
  @ApiOperation({
    summary:
      'Sube la imagen de un producto, guarda la ruta de acceso en el producto y retorna la ruta',
  })
  @ApiResponse({ status: 201, description: 'Imagen subida con éxito' })
  @ApiResponse({ status: 400, description: 'Error al subir imagen' })
  @ApiBody({ type: Object })
  @Post('addProductImage/:idProducto')
  @ApiBody({ type: UpdateProductImageDto })
  async addProductImage(
    @Body(ValidarBase64Pipe) base64Content: UpdateProductImageDto,
    @Param('idProducto', ParseIntPipe, ProductoExistentePipe)
    idProducto: number,
  ) {
    return await this.productosService.addProductImage(
      base64Content,
      idProducto,
    );
  }

  // @ApiOperation({
  //   summary:
  //     'INHABILITADO. Actualizar la imagen de un producto, guarda la ruta de acceso en el producto y retorna la ruta',
  // })
  // @ApiResponse({ status: 200, description: 'Imagen actualizada con éxito' })
  // @ApiResponse({ status: 400, description: 'Error al actualizar imagen' })
  // @ApiBody({ type: UpdateProductImageDto })
  // @Patch('updateProductImage/:idProducto')
  // async updateProductImage(
  //   @Body(ValidarBase64Pipe) base64Content: UpdateProductImageDto,
  //   @Param('idProducto', ParseIntPipe, ProductoExistentePipe)
  //   idProducto: number,
  // ) {
  //   throw new ServiceUnavailableException('Servicio en mantención')
  //   // return await this.productosService.updateProductImage(
  //   //   base64Content,
  //   //   idProducto,
  //   // );
  // }

  @ApiOperation({ summary: 'Eliminar la imagen de un producto según el índice de la imagen en el arreglo.' })
  @ApiResponse({ status: 200, description: 'Imagen eliminada con éxito' })
  @ApiResponse({ status: 400, description: 'Error al eliminar imagen' })
  @Delete('deleteProductImage/:idProducto/:indiceImagen')
  async deleteProductImage(
    @Param(
      'idProducto',
      ParseIntPipe,
      ProductoExistentePipe,
      ValidarImagenProductoExistePipe,
    )
    idProducto: number,
    @Param(
      'indiceImagen',
      ParseIntPipe,
    )
    indiceImagen: number,
  ) {
    return await this.productosService.deleteProductImage(idProducto, indiceImagen);
  }
}
