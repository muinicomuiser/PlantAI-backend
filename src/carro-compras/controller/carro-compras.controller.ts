import {
  Body,
  Controller,
  Delete,
  Request,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';
import { AddProductCarro } from '../dto/add-product-carro';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { GetCarroProductoDto } from '../dto/get-carro-producto.dto';
import { UpdateContenidoCarroDto } from '../dto/update-carro-compra.dto';
import { UpdateProductCarro } from '../dto/update-product-carro';
import { ValidarCarroActivoPipe } from '../pipe/validar-carro-activo-existente.pipe';
import { ValidarCarroExistePipe } from '../pipe/validar-carro-existe.pipe';
import { ProductoExistentePipe } from '../pipe/validar-producto-existente.pipe';
import { CarroComprasService } from '../service/carro-compras.service';
import { NoStockProductosCarroDto } from '../dto/no-stock-carro-productos.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtUser, RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard/jwt-auth.guard';

/**Historia de Usuario 9: Añadir Productos al Carrito de Compras */
// @ApiTags('Carro de compras')
@Controller('carro-compras')
export class CarroComprasController {
  constructor(private readonly carroComprasService: CarroComprasService) { }

  // Obtener carro de compras por id
  @ApiTags('Carro de compras - Admin')
  @ApiOperation({ summary: 'Busca un carro de compras por id' })
  @ApiResponse({
    status: 200,
    description: 'Carro encontrado',
    type: GetCarroComprasDto,
  })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @ApiBearerAuth('access-token')
  @Get(':id')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findByCarroId(
    @Param('id', ParseIntPipe, ValidarCarroExistePipe) id: number,
  ): Promise<GetCarroComprasDto> {
    return await this.carroComprasService.findByCarroId(+id);
  }

  // Obtener todos los carros activos.
  @ApiTags('Carro de compras - Admin')
  @ApiOperation({ summary: 'Obtener todos los carros activos.' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los carros',
    type: [GetCarroComprasDto],
  })
  @ApiBearerAuth('access-token')
  @Get()
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async obtenerTodos(): Promise<GetCarroComprasDto[]> {
    return await this.carroComprasService.findAll();
  }

  // Obtener carro de compras por id de usuario
  // Se asume que este método solo trae el carro activo
  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({
    summary: 'Busca el carro activo de un usuario según id de usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Carro encontrado',
    type: GetCarroComprasDto,
  })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @ApiBearerAuth('access-token')
  @Get('user/:id')
  @Roles('Super Admin', 'Admin', 'Cliente', 'Visitante')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findByUserId(
    @Param('id', ParseIntPipe, ValidarUsuarioExistePipe) id: number,
  ): Promise<GetCarroComprasDto> {
    return await this.carroComprasService.findByUserId(+id);
  }

  // Crear carro de compras
  @ApiTags('Carro de compras - Admin')
  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({ summary: 'Crea un nuevo carro de compras para un usuario. Si el usuario logueado es Cliente, solo puede crearse un carro a sí mismo.' })
  @ApiResponse({
    status: 201,
    description: 'Carro creado',
    type: GetCarroComprasDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Error al crear carro. El usuario no puede tener más de un carro activo.',
  })
  @ApiResponse({ status: 404, description: 'No existe un usuario con el ID' })
  @ApiBearerAuth('access-token')
  @Post(':idUsuario')
  @Roles('Super Admin', 'Admin', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createCarro(
    @Param(
      'idUsuario',
      ParseIntPipe,
      ValidarUsuarioExistePipe,
      ValidarCarroActivoPipe,
    )
    idUsuario: number,
    @Request() request: Request
  ) {
    const currentUser: JwtUser = request['user']
    return await this.carroComprasService.validateCreateCarro(idUsuario, currentUser);
  }

  // Eliminar carro de compras
  @ApiTags('Carro de compras - Admin')
  @ApiOperation({ summary: 'Elimina un carro de compras' })
  @ApiResponse({ status: 200, description: 'Carro borrado' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @Roles('Super Admin', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteCarro(
    @Param('id', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
  ) {
    return await this.carroComprasService.deleteCarro(idCarro);
  }

  // - Agregar producto al carro
  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({ summary: 'Agrega un producto al carro de compras' })
  @ApiResponse({
    status: 201,
    description: 'Producto agregado',
    type: GetCarroProductoDto,
  })
  @ApiResponse({ status: 400, description: 'Producto no ha sido agregado' })
  @ApiBody({ type: AddProductCarro })
  @Post('addProducto/:idCarro')
  async addProductToCarro(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Body() addProductDto: AddProductCarro,
  ) {
    return await this.carroComprasService.addProductToCarro(
      idCarro,
      addProductDto,
    );
  }

  // - Cambiar cantidad de producto de carro
  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({ summary: 'Actualiza la cantidad de un producto determinado' })
  @ApiResponse({
    status: 200, description: 'Cantidad actualizada',
    type: GetCarroProductoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'No ha sido actualizada la cantidad',
  })
  @ApiBody({ type: UpdateProductCarro })
  @Patch('updateProducto/:idCarro')
  async updateProductQuantity(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Body(ProductoExistentePipe<UpdateProductCarro>)
    updateDto: UpdateProductCarro,
  ) {
    return await this.carroComprasService.updateProductQuantity(
      idCarro,
      updateDto,
    );
  }

  // - Remover producto del carro
  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({ summary: 'Remueve un producto del carro' })
  @ApiResponse({
    status: 201,
    description: 'Producto eliminado del carro',
    type: GetCarroProductoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El producto no ha podido ser eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'Carro o producto no encontrado',
  })
  @Delete('removeProducto/:idCarro/:idProducto')
  async removeProductCarro(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Param('idProducto', ParseIntPipe, ProductoExistentePipe<number>)
    idProducto: number,
  ): Promise<GetCarroProductoDto> {
    return await this.carroComprasService.removeProductCarro(
      idCarro,
      idProducto,
    );
  }

  // - Llenar carro / reemplazar contenido de carro
  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({ summary: 'Reemplaza el contenido de un carro de compras.' })
  @ApiResponse({
    status: 200,
    description: 'Contenido reemplazado con éxito.',
    type: [GetCarroProductoDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Error al modificar el contenido del carro.',
  })
  @ApiResponse({ status: 404, description: 'El producto no existe.' })
  @ApiBody({ type: UpdateContenidoCarroDto })
  @Put('replaceProductos/:idCarro')
  async replaceProductosCarro(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Body(ProductoExistentePipe<UpdateContenidoCarroDto>)
    updateCarroDto: UpdateContenidoCarroDto,
  ): Promise<GetCarroProductoDto[]> {
    const carroProductosDto: GetCarroProductoDto[] =
      await this.carroComprasService.replaceProductosCarro(
        +idCarro,
        updateCarroDto,
      );
    return carroProductosDto;
  }

  @ApiTags('Carro de compras - Cliente')
  @ApiOperation({ summary: 'Valida el stock del contenido de un carro. Si hay conflicto, devuelve el máximo por producto en conflicto, si no, actualiza el carro. FINALIZAR COMPRA.' })
  @ApiResponse({ status: 201, description: 'Stock suficiente y contenido del carro de compras actualizado.', type: [GetCarroProductoDto] })
  @ApiResponse({ status: 400, description: 'Stock insuficiente de uno o más productos.', type: NoStockProductosCarroDto })
  @ApiBody({ type: UpdateContenidoCarroDto })
  @ApiBearerAuth('access-token')
  @Post('/validateProductosCarro/:idCarro')
  @Roles('Visitante', 'Cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async validateProductosCarro(@Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number, @Body(ProductoExistentePipe) contenidoCarroDto: UpdateContenidoCarroDto): Promise<GetCarroProductoDto[]> {
    return await this.carroComprasService.validateProductosCarro(idCarro, contenidoCarroDto)
  }
}
