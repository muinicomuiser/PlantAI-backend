import { Injectable } from '@nestjs/common';
import { ProductoSalidaDto } from 'src/productos/dto/producto-salida.dto';
import { ProductosService } from 'src/productos/service/productos.service';
import { ProductsDtoExamples } from '../examples/productsDTO.examples';

@Injectable()
export class CatalogoService {
  productos: ProductoSalidaDto[] = [...ProductsDtoExamples];
  constructor(private readonly productService: ProductosService) { }

  /**Retorna todos los productos */
  findAll() {
    return this.productService.getAll();
  }

  findBestSellers() {
    return this.productos;
  }

  findByRating(puntuacion: number) {
    return this.productos;
  }

  findRecommended(id: number) {
    return this.productos;
  }

  filterByPrice(min: number, max: number) {
    return this.productos;
  }
}