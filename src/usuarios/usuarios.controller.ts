import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**Historia de Usuario 5: Publicación de Productos por Parte de los Vendedores*/
  @Get()
  findAll(@Res() res: Response) {
    const result = this.usuariosService.findAll();
    res.json({ message: result });
  }

}
