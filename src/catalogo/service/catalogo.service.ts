import { Injectable } from '@nestjs/common';
import { ProductoSalidaDto } from 'src/productos/dto/producto-salida.dto';
import { FotoPeriodo, TipoRiego } from 'src/productos/entities/categorias';
import { ProductosService } from 'src/productos/service/productos.service';

@Injectable()
export class CatalogoService {
  productos: ProductoSalidaDto[] = [];
  constructor(private readonly productService: ProductosService) {
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
      'verde',
    );
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
      'verde',
    );
    plantaDosDto.id = 2;
    plantaDosDto.puntuacion = 5;
    plantaDosDto.unidadesVendidas = 10;

    const plantaNueveDto: ProductoSalidaDto = new ProductoSalidaDto(
      'Buganvilla',
      14000,
      'plantAI.com/imagenes/buganvilla.jpg',
      'Planta ejemplo. Novena planta de la tienda',
      5,
      'Nictagináceas',
      FotoPeriodo.neutro,
      TipoRiego.regadera,
      true,
      'Lila',
    );
    plantaNueveDto.id = 9;
    plantaNueveDto.puntuacion = 5;
    plantaNueveDto.unidadesVendidas = 25;
    this.productos.push(plantaUnoDto, plantaDosDto, plantaNueveDto);
  }

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
