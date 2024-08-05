import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(@Res() res: Response) {
    const result = this.usuariosService.findAll();
    res.json({ message: result });
  }

}
