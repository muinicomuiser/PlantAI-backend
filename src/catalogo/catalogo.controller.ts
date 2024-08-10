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
import { CatalogoService } from './catalogo.service';
import { Response } from 'express';

@Controller('catalogo')
export class CatalogoController {
    constructor(private readonly catalogoService: CatalogoService) {}

    /**Historia de Usuario 12: Visualización del catálogo*/

    //Entrega la descripción de la épica visualización
    @Get()
    findAll(@Res() res: Response) {
        const result = this.catalogoService.findAll();
        res.json({ message: result });
    }
}
