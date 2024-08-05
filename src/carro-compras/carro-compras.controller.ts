import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CarroComprasService } from './carro-compras.service';
import { Response } from 'express';


@Controller('carro-compras')
export class CarroComprasController {
  constructor(private readonly carroComprasService: CarroComprasService) {}

  @Get()
  findAll(@Res() res: Response) {
    const result = this.carroComprasService.findAll();
    res.json({ message: result });
  }

}
