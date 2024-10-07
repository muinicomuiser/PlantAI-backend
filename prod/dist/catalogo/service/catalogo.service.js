'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CatalogoService = void 0;
const common_1 = require('@nestjs/common');
const producto_salida_dto_1 = require('../../productos/dto/producto-salida.dto');
const categorias_1 = require('../../productos/entities/categorias');
const productos_service_1 = require('../../productos/service/productos.service');
let CatalogoService = class CatalogoService {
  constructor(productService) {
    this.productService = productService;
    this.productos = [];
    const plantaUnoDto = new producto_salida_dto_1.ProductoSalidaDto(
      'Ciprés',
      5000,
      'cotiledon.com/imagenes/cipres.jpg',
      'Producto ejemplo. Primera planta de la tienda',
      5,
      'Conífera',
      categorias_1.FotoPeriodo.largo,
      categorias_1.TipoRiego.regadera,
      true,
      'verde',
    );
    plantaUnoDto.id = 1;
    plantaUnoDto.puntuacion = 5;
    plantaUnoDto.unidadesVendidas = 5;
    const plantaDosDto = new producto_salida_dto_1.ProductoSalidaDto(
      'Espino',
      10000,
      'cotiledon.com/imagenes/espino.jpg',
      'Producto ejemplo. Segunda planta de la tienda',
      10,
      'Leguminosa',
      categorias_1.FotoPeriodo.neutro,
      categorias_1.TipoRiego.inmersion,
      false,
      'verde',
    );
    plantaDosDto.id = 2;
    plantaDosDto.puntuacion = 5;
    plantaDosDto.unidadesVendidas = 10;
    const plantaNueveDto = new producto_salida_dto_1.ProductoSalidaDto(
      'Buganvilla',
      14000,
      'plantAI.com/imagenes/buganvilla.jpg',
      'Planta ejemplo. Novena planta de la tienda',
      5,
      'Nictagináceas',
      categorias_1.FotoPeriodo.neutro,
      categorias_1.TipoRiego.regadera,
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
  findByRating(puntuacion) {
    return this.productos;
  }
  findRecommended(id) {
    return this.productos;
  }
  filterByPrice(min, max) {
    return this.productos;
  }
};
exports.CatalogoService = CatalogoService;
exports.CatalogoService = CatalogoService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [productos_service_1.ProductosService]),
  ],
  CatalogoService,
);
//# sourceMappingURL=catalogo.service.js.map
