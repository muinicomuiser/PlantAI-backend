import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {

  findAll() {
    return `Busqueda de productos`;
  }
}
