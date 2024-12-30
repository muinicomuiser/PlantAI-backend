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
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
<<<<<<< HEAD

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
import { Roles } from 'src/auth/decorators/roles.decorator';
=======
import { ProductosService } from '../service/productos.service';
>>>>>>> 5d037afef55af5de9f687414e41c97036d8c3cca
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { ProductoExistentePipe } from 'src/carro-compras/pipe/validar-producto-existente.pipe';
import { PaginacionDto } from '../dto/catalogo/paginacion.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { GetProductosAdminDto } from '../dto/producto/get-paginacion-admin.dto';
import { UpdateProductImageDto } from '../dto/producto/update-product-image.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { ValidarBase64Pipe } from '../pipe/validar-base64.pipe';
import { ValidarCategoriaProductoPipe } from '../pipe/validar-categoria-producto.pipe';
import { ValidarImagenProductoExistePipe } from '../pipe/validar-imagen-producto-existe.pipe';
import { ValidarPropiedadesProductoPipe } from '../pipe/validar-propiedades-producto.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';

/**Historia de Usuario 5: Implementación de "gestión de productos" Administrador */
/**Historia de Usuario 7: Búsqueda de Productos */
@ApiTags('Gestión de productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @ApiOperation({
    summary:
      'Retorna todos los productos registrados. PREFERIR GET productos/admin para paginación.',
    description:
      'Ahora está habilitado el GET productos/admin, que retorna todos los productos y permite paginar.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los productos',
    type: [GetProductoDto],
  })
  @ApiBearerAuth('access-token')
  @Get()
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<GetProductoDto[]> {
    return this.productosService.getAll();
  }

  @ApiOperation({
    summary: 'Retorna todos los productos registrados paginados.',
  })
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
  @ApiBearerAuth('access-token')
  @Get('admin')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllPaginated(
    @Query('page')
    page?: number,
    @Query('pageSize')
    pageSize?: number,
  ): Promise<GetProductosAdminDto> {
    const paginacionDto: PaginacionDto = {
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 10,
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
    summary: 'Crea un producto.',
    description: 'Crea un producto nuevo. Permite agregar una imagen nueva.',
  })
  @ApiResponse({
    status: 200,
    description: 'Agrega un producto al sistema.',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'No ha sido posible crear el producto',
  })
  @ApiBody({ type: CreateProductoDto })
  @ApiBearerAuth('access-token')
  @Post()
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createProduct(
    @Body(
      ValidarBase64Pipe,
      ValidarCategoriaProductoPipe,
      ValidarPropiedadesProductoPipe,
    )
    createProductoDto: CreateProductoDto,
  ): Promise<GetProductoDto> {
    return await this.productosService.create(createProductoDto);
  }

  // Actualizar un producto
  @ApiOperation({ summary: 'Actualiza un producto.' })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({
    status: 200,
    description: 'Actualiza un producto.',
    type: GetProductoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se ha encontrado un producto con ese id.',
  })
  @ApiParam({ name: 'idProducto', type: Number })
  @ApiBearerAuth('access-token')
  @Patch(':idProducto')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateProduct(
    @Param('idProducto', ProductoExistentePipe) idProducto: number,
    @Body(
      ValidarBase64Pipe,
      ValidarCategoriaProductoPipe,
      ValidarPropiedadesProductoPipe,
    )
    updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
    return await this.productosService.update(idProducto, updateProductoDto);
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
  @ApiBearerAuth('access-token')
  @Delete(':idProducto')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOne(
    @Param('idProducto', ProductoExistentePipe) idProducto: number,
  ): Promise<GetProductoDto> {
    return await this.productosService.deleteOne(idProducto);
  }

  //Subir imagen en bas64 a un producto
  @ApiOperation({
    summary:
      'Sube la imagen de un producto, guarda la ruta de acceso en el producto y retorna la ruta',
  })
  @ApiResponse({ status: 201, description: 'Imagen subida con éxito' })
  @ApiResponse({ status: 400, description: 'Error al subir imagen' })
  @ApiBody({ type: Object })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateProductImageDto })
  @Post('addProductImage/:idProducto')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  // @ApiBearerAuth()
  // @Roles('Super Admin', 'Admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
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

  @ApiOperation({
    summary:
      'Eliminar la imagen de un producto según el índice de la imagen en el arreglo.',
  })
  @ApiResponse({ status: 200, description: 'Imagen eliminada con éxito' })
  @ApiResponse({ status: 400, description: 'Error al eliminar imagen' })
  @ApiBearerAuth('access-token')
  @Delete('deleteProductImage/:idProducto/:indiceImagen')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteProductImage(
    @Param(
      'idProducto',
      ParseIntPipe,
      ProductoExistentePipe,
      ValidarImagenProductoExistePipe,
    )
    idProducto: number,
    @Param('indiceImagen', ParseIntPipe)
    indiceImagen: number,
  ) {
    return await this.productosService.deleteProductImage(
      idProducto,
      indiceImagen,
    );
  }
}
