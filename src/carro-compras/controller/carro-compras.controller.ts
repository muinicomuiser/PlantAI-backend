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
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { CarroComprasService } from '../service/carro-compras.service';
import { ValidarCarroExistePipe } from '../pipe/validar-carro-existe.pipe';
import { AddProductCarro } from '../dto/add-product-carro';
import { UpdateProductCarro } from '../dto/update-product-carro';
import { ProductoExistentePipe } from '../pipe/validar-producto-existente.pipe';
import { ValidarCarroActivoPipe } from '../pipe/validar-carro-activo-existente.pipe';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';

/**Historia de Usuario 9: Añadir Productos al Carrito de Compras */
@ApiTags('Carro de compras')
@Controller('carro-compras')
export class CarroComprasController {
  constructor(private readonly carroComprasService: CarroComprasService) { }

  // Obtener carro de compras por id
  @ApiOperation({ summary: 'Busca un carro de compras por id' })
  @ApiResponse({
    status: 200,
    description: 'Carro encontrado',
    type: GetCarroComprasDto,
  })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Get(':id')
  async findByCarroId(
    @Param('id', ParseIntPipe, ValidarCarroExistePipe) id: number,
  ): Promise<GetCarroComprasDto> {
    return await this.carroComprasService.findByCarroId(+id);
  }

  // Obtener carro de compras por id de usuario
  /**Validar que usuario existe y que carro existe.
   * Son todos los carros o solo el activo?
   * Se asume que este método solo trae el carro activo
   */
  @ApiOperation({ summary: 'Busca un carro de compras por id de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Carro encontrado',
    type: GetCarroComprasDto,
  })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Get('user/:id')
  async findByUserId(
    @Param('id', ParseIntPipe, ValidarUsuarioExistePipe) id: number,
  ): Promise<GetCarroComprasDto> {
    return await this.carroComprasService.findByUserId(+id);
  }

  // Crear carro de compras
  @ApiOperation({ summary: 'Crea un carro de compras' })
  @ApiResponse({ status: 201, description: 'Carro creado' })
  @ApiResponse({ status: 400, description: 'Error al crear carro. El usuario no puede tener más de un carro activo.' })
  @ApiResponse({ status: 404, description: 'No existe un usuario con el ID' })
  @Post(':idUsuario')
  createCarro(@Param('idUsuario', ParseIntPipe, ValidarUsuarioExistePipe, ValidarCarroActivoPipe) idUsuario: number) {
    return this.carroComprasService.createCarro(idUsuario);
  }

  // Eliminar carro de compras
  @ApiOperation({ summary: 'Borra un carro de compras' })
  @ApiResponse({ status: 200, description: 'Carro borrado' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Delete(':id')
  deleteCarro(@Param('id', ParseIntPipe, ValidarCarroExistePipe) idCarro: number) {
    return this.carroComprasService.deleteCarro(idCarro);
  }

  @ApiOperation({ summary: 'Agrega un producto al carro de compras' })
  @ApiResponse({ status: 201, description: 'Producto agregado' })
  @ApiResponse({ status: 400, description: 'Producto no ha sido agregado' })
  @ApiBody({ type: AddProductCarro })
  @Post('add/:idCarro')
  async addProductToCarro(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Body() addProductDto: AddProductCarro) {
    return await this.carroComprasService.addProductToCarro(idCarro, addProductDto);
  }

  @ApiOperation({ summary: 'Actualiza la cantidad de un producto determinado' })
  @ApiResponse({ status: 200, description: 'Cantidad actualizada' })
  @ApiResponse({ status: 400, description: 'No ha sido actualizada la cantidad' })
  @ApiBody({ type: UpdateProductCarro })
  @Patch('updateProducto/:idCarro')
  async updateProductQuantity(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Body() updateDto: UpdateProductCarro) {
    return await this.carroComprasService.updateProductQuantity(idCarro, updateDto);
  }

  @ApiOperation({ summary: 'Elimina un producto del carro' })
  @ApiResponse({ status: 201, description: 'Producto eliminado del carro' })
  @ApiResponse({ status: 400, description: 'El producto no ha podido ser eliminado' })
  @Delete('remove/:idCarro/:idProducto')
  async removeProductCarro(
    @Param('idCarro', ParseIntPipe, ValidarCarroExistePipe) idCarro: number,
    @Param('idProducto', ParseIntPipe, ProductoExistentePipe) idProducto: number) {
    return await this.carroComprasService.removeProductCarro(idCarro, idProducto);
  }
}
