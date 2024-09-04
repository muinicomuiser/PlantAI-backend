import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarroComprasService } from './carro-compras.service';
import { CreateCarroCompraDto } from './dto/create-carro-compra.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCarroCompraDto } from './dto/update-carro-compra.dto';
import { OutputCarroComprasDto } from './dto/output-carro-compras.dto';

@ApiTags('Carro de compras')
@Controller('carro-compras')
export class CarroComprasController {
  constructor(private readonly carroComprasService: CarroComprasService) { }


  @ApiOperation({ summary: 'Crea un carro de compras' })
  @ApiResponse({ status: 201, description: 'Carro creado' })
  @ApiResponse({ status: 400, description: 'Error al crear carro' })
  @Post()
  createCarro(@Body() carro: CreateCarroCompraDto) {
    return this.carroComprasService.createCarro(carro);
  }


  @ApiOperation({ summary: 'Busca un carro de compras por id' })
  @ApiResponse({ status: 200, description: 'Carro encontrado', type: OutputCarroComprasDto })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Get(':id')
  findByCarroId(@Param('id') id: number) {
    return this.carroComprasService.findByCarroId(id);
  }


  @ApiOperation({ summary: 'Busca un carro de compras por id de usuario' })
  @ApiResponse({ status: 200, description: 'Carro encontrado', type: OutputCarroComprasDto })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Get('user/:id')
  findByUserId(@Param('id') id: number) {
    return this.carroComprasService.findByUserId(id);
  }


  @ApiOperation({ summary: 'Borra un carro de compras' })
  @ApiResponse({ status: 200, description: 'Carro borrado' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Delete(':id')
  deleteCarro(@Param('id') id: number) {
    return this.carroComprasService.deleteCarro(id);
  }


  @ApiOperation({ summary: 'Actualiza un carro de compras' })
  @ApiResponse({ status: 200, description: 'Carro actualizado' })
  @ApiResponse({ status: 404, description: 'Carro no encontrado' })
  @Patch(':id')
  updateCarro(@Body() carro: UpdateCarroCompraDto, @Param('id') id: number) {
    return this.carroComprasService.updateCarro(id, carro);
  }
}
