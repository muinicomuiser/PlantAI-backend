import { Injectable } from '@nestjs/common';
import { FotoPeriodo, TipoRiego } from 'src/productos/entities/categorias';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CatalogoService {
  productos: Producto[] = [];
  constructor() {
    const plantaUno: Producto = new Producto(
      'Unila',
      5000,
      'cotiledon.com/imagenes/unila.jpg',
      'Producto ejemplo. Primera planta de la tienda',
      5,
      'conifera',
      FotoPeriodo.largo,
      TipoRiego.regadera,
      true,
      'verde',
    );
    plantaUno.id = 1;

    const plantaDos: Producto = new Producto(
      'Dorila',
      10000,
      'cotiledon.com/imagenes/dorila.jpg',
      'Producto ejemplo. Segunda planta de la tienda',
      10,
      'magnólida',
      FotoPeriodo.neutro,
      TipoRiego.inmersion,
      false,
      'rosado',
    );
    plantaDos.id = 2;
    this.productos.push(plantaUno, plantaDos);
  }
  findAll() {
    return this.productos;
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
}
