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
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    /**Historia de Usuario 5: Crear productos por parte */
    //entrega la desripción de módulo usuarios
    @Get()
    findAll(@Res() res: Response) {
        const result = this.usuariosService.findAll();
        res.json({ message: result });
    }
}
