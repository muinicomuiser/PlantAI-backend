import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FotoPeriodo, TipoRiego } from './entities/categorias';
import { ProductoSalidaDto } from './dto/producto-salida.dto';

/**Historia de Usuario 7: Búsqueda de Productos*/
@ApiTags('Búsqueda de productos')
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    // Obtener por id

    @ApiOperation({ summary: 'Busca un producto por su id.' })
    @ApiResponse({ status: 200, description: 'Retorna el producto que coincida con el id.', type: ProductoSalidaDto })
    @ApiResponse({ status: 404, description: 'No se encuentra un producto registrado con ese id.' })
    @ApiParam({ name: 'id', type: Number })

    @Get(':id')
    getById(@Param('id') id: number, @Res() response: Response): void {
        const producto: ProductoSalidaDto = this.productosService.getById(id)
        if (producto) {
            response.status(200).send(producto);
        }
        else {
            response.status(404).send({ error: 'No existe un producto asociado al id.' })
        }
    }

    // Obtener todos los productos
    // Obtener por filtros (nombre, familia, fotoperiodo, tipoRiego, petFriendly, color)
    @ApiOperation({ summary: 'Busca productos por filtros.' })
    @ApiResponse({ status: 200, type: ProductoSalidaDto, description: 'Devuelve todos los productos que coincidan con los parámetros de búsqueda. Si no se definen parámetros, devuelve todos los productos.' })
    @ApiQuery({ name: 'nombre', required: false })
    @ApiQuery({ name: 'familia', required: false })
    @ApiQuery({ name: 'fotoperiodo', enum: FotoPeriodo, required: false })
    @ApiQuery({ name: 'tiporiego', enum: TipoRiego, required: false })
    @ApiQuery({ name: 'petfriendly', enum: ['true', 'false'], required: false })
    @ApiQuery({ name: 'color', required: false })

    @Get()
    getByFilters(@Query('nombre') nombre: string, @Query('familia') familia: string,
        @Query('fotoperiodo') fotoperiodo: FotoPeriodo, @Query('tiporiego') tipoRiego: TipoRiego,
        @Query('petfriendly') petFriendly: string, @Query('color') color: string, @Res() response: Response): void {

        let petFriendlyBoolean: boolean;
        if (petFriendly) {
            petFriendlyBoolean = petFriendly == 'true' ? true : false;
        }
        const productos: ProductoSalidaDto[] = this.productosService.getByFilters(nombre, familia, fotoperiodo, tipoRiego, petFriendlyBoolean, color);
        response.status(200).send(productos);
    }
}

// Servicios
    // Obtener todos los productos
    // Obtener por id
    // Obtener por filtros (nombre, familia, fotoperiodo, tipoRiego, petFriendly, color)