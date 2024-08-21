import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Query} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Response } from 'express';
import { Producto } from './entities/producto.entity';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FotoPeriodo, TipoRiego } from './entities/categorias';

/**Historia de Usuario 7: Búsqueda de Productos*/

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

    // Obtener por id
    @ApiResponse({status: 200, description: 'Retorna el producto que coincida con el id.'})
    @ApiResponse({status: 404, description: 'No se encuentra un producto registrado con ese id.'})

    @Get(':id')
    obtenerPorId(@Param('id') id: number, @Res() response: Response): void{
        const producto: Producto = this.productosService.obtenerPorId(id)
        if(producto){
            response.status(200).send(producto);
        }
        else{
            response.status(404).send({error: 'No existe un producto asociado al id.'})
        }
    }

    // Obtener todos los productos
    @ApiResponse({status: 200, description: 'Devuelve todos los productos que coincidan con los parámetros de búsqueda. Si no se definen parámetros, devuelve todos los productos.'})
    @ApiQuery({name: 'nombre', required: false})
    @ApiQuery({name: 'especie', required: false})
    @ApiQuery({name: 'fotoperiodo', enum: FotoPeriodo, required: false})
    @ApiQuery({name: 'tiporiego', enum: TipoRiego, required: false})
    @ApiQuery({name: 'petfriendly', enum: ['true', 'false'], required: false})
    @ApiQuery({name: 'color', required: false})

    @Get()
    obtenerPorFiltros(@Query('nombre') nombre: string, @Query('especie') especie: string, 
        @Query('fotoperiodo') fotoperiodo: FotoPeriodo, @Query('tiporiego') tipoRiego: TipoRiego, 
        @Query('petfriendly') petFriendly: string, @Query('color') color: string, @Res() response: Response): void {

        let petFriendlyBoolean: boolean;
        if(petFriendly){
            petFriendlyBoolean = petFriendly == 'true' ? true : false;
        }
        const productos = this.productosService.obtenerPorFiltros(nombre, especie, fotoperiodo, tipoRiego, petFriendlyBoolean, color);
        response.status(200).send(productos);
    }

}

// Servicios
    // Obtener todos los productos
    // Obtener por id y por nombre
    // Obtener por filtros (especie, fotoperiodo, tipoRiego, petFriendly, color)