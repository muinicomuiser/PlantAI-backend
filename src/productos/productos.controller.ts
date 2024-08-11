import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Response } from 'express';

@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

    /**Historia de Usuario 7: Búsqueda de Productos*/

    //Entrega la descripción del módulo
    @Get()
    findAll(@Res() res: Response) {
        const result = this.productosService.findAll();
        res.json({ message: result });
    }
}
