import { Injectable } from '@nestjs/common';
import { ProductoSalidaDto } from 'src/productos/dto/producto-salida.dto';
import { FotoPeriodo, TipoRiego } from 'src/productos/entities/categorias';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CatalogoService {
  productos: ProductoSalidaDto[] = [];
  constructor() {
    const plantaUnoDto: ProductoSalidaDto = new ProductoSalidaDto(
      'Ciprés', 
      5000, 
      'cotiledon.com/imagenes/cipres.jpg', 
      'Producto ejemplo. Primera planta de la tienda', 
      5, 
      'Conífera', 
      FotoPeriodo.largo, 
      TipoRiego.regadera, 
      true, 
      'verde');
      plantaUnoDto.id = 1;
      plantaUnoDto.puntuacion = 5;
      plantaUnoDto.unidadesVendidas = 5;

    const plantaDosDto: ProductoSalidaDto = new ProductoSalidaDto(
      'Espino', 
      10000, 
      'cotiledon.com/imagenes/espino.jpg', 
      'Producto ejemplo. Segunda planta de la tienda', 
      10, 
      'Leguminosa', 
      FotoPeriodo.neutro, 
      TipoRiego.inmersion, 
      false, 
      'verde' );
      plantaDosDto.id = 2;
      plantaDosDto.puntuacion = 5;
      plantaDosDto.unidadesVendidas = 10;
    this.productos.push(plantaUnoDto, plantaDosDto);
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
