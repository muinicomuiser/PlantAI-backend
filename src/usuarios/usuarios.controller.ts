import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    /**Historia de Usuario 3: Creación de usuarios y perfiles de compradores */
    //entrega la desripción de módulo usuarios
    @Get()
    findAll(@Res() res: Response) {
        const result = this.usuariosService.findAll();
        res.json({ message: result });
    }

    //Obtiene un usuario según su ID
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usuariosService.findOne(id);
    }

    //Crear un usuario
    @Post()
    createUser(@Body() usuario: CreateUsuarioDto) {
        return this.usuariosService.createUser(usuario);
    }

    //Actualiza un usuario según el id
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() usuario: UpdateUsuarioDto) {
        return this.usuariosService.updateOne(id, usuario);
    }


    //Elimina un usuario según el id
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.usuariosService.deleteOne(id);
    }
}
