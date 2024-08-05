import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { Response } from 'express';


@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  findAll(@Res() res: Response) {
    const result = this.catalogoService.findAll();
    res.json({ message: result });
  }

}
