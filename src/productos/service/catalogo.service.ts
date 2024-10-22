import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/service/productos.service';

@Injectable()
export class CatalogoService {
  constructor(private readonly productService: ProductosService) {}

  /**Retorna todos los productos */
  findAll() {
    return null;
  }

  findBestSellers() {
    return null;
  }

  findByRating(puntuacion: number) {
    return null;
  }

  findRecommended(id: number) {
    return null;
  }

  filterByPrice(min: number, max: number) {
    return null;
  }
}
