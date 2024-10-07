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
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductosService = void 0;
const common_1 = require('@nestjs/common');
const producto_salida_dto_1 = require('../dto/producto-salida.dto');
const categorias_1 = require('../entities/categorias');
let ProductosService = class ProductosService {
  constructor() {
    this.productosSalida = [
      plantaUnoDto,
      plantaDosDto,
      plantaTresDto,
      plantaCuatroDto,
      plantaCincoDto,
      plantaSeisDto,
      plantaSieteDto,
      plantaOchoDto,
      plantaNueveDto,
      plantaDiezDto,
    ];
  }
  getById(id) {
    return plantaUnoDto;
  }
  getByFilters() {
    return this.productosSalida;
  }
  getAll() {
    return this.productosSalida;
  }
  create() {
    return { mensaje: 'Producto creado' };
  }
  update() {
    return { mensaje: 'Producto actualizado' };
  }
  deleteOne(id) {
    return { mensaje: 'Producto eliminado' };
  }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate(
  [(0, common_1.Injectable)()],
  ProductosService,
);
const plantaUnoDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Ciprés',
  5000,
  'plantAI.com/imagenes/cipres.jpg',
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
  'plantAI.com/imagenes/espino.jpg',
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
const plantaTresDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Grevillea',
  15000,
  'plantAI.com/imagenes/grevillea.jpg',
  'Producto ejemplo. Tercera planta de la tienda',
  15,
  'Protácea',
  categorias_1.FotoPeriodo.corto,
  categorias_1.TipoRiego.goteo,
  false,
  'verde',
);
plantaTresDto.id = 3;
plantaTresDto.puntuacion = 3;
plantaTresDto.unidadesVendidas = 15;
const plantaCuatroDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Juniperus-Azul',
  8000,
  'plantAI.com/imagenes/juniperus.jpg',
  'Producto ejemplo. Cuarta planta de la tienda',
  8,
  'Cupresáceas',
  categorias_1.FotoPeriodo.neutro,
  categorias_1.TipoRiego.regadera,
  false,
  'Verde',
);
plantaCuatroDto.id = 4;
plantaCuatroDto.puntuacion = 4;
plantaCuatroDto.unidadesVendidas = 10;
const plantaCincoDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Agatea Verde',
  5000,
  'plantAI.com/imagenes/agatea.jpg',
  'Producto ejemplo. Quinta planta de la tienda',
  15,
  'Aesteraceae',
  categorias_1.FotoPeriodo.neutro,
  categorias_1.TipoRiego.regadera,
  false,
  'Verde',
);
plantaCincoDto.id = 5;
plantaCincoDto.puntuacion = 5;
plantaCincoDto.unidadesVendidas = 5;
const plantaSeisDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Dólar blanco',
  20000,
  'plantAI.com/imagenes/dolarblanco.jpg',
  'Planta ejemplo. Sexta planta de la tienda',
  20,
  'Lamiaceae',
  categorias_1.FotoPeriodo.neutro,
  categorias_1.TipoRiego.regadera,
  true,
  'Verde con blanco',
);
plantaSeisDto.id = 6;
plantaSeisDto.puntuacion = 5;
plantaSeisDto.unidadesVendidas = 10;
const plantaSieteDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Pennisetum Rubra',
  17000,
  'plantAI.com/imagenes/pennisetumrubra.jpg',
  'Planta ejemplo. Séptima planta de la tienda',
  15,
  'Poaceae',
  categorias_1.FotoPeriodo.largo,
  categorias_1.TipoRiego.regadera,
  true,
  'Roja',
);
plantaSieteDto.id = 7;
plantaSieteDto.puntuacion = 5;
plantaSieteDto.unidadesVendidas = 7;
const plantaOchoDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Sedum japonicum',
  5000,
  'plantAI.com/imagenes/sedumjaponicum.jpg',
  'Planta ejemplo. Octava planta de la tienda',
  10,
  'Crasuláceas',
  categorias_1.FotoPeriodo.neutro,
  categorias_1.TipoRiego.regadera,
  true,
  'Verde',
);
plantaOchoDto.id = 8;
plantaOchoDto.puntuacion = 5;
plantaOchoDto.unidadesVendidas = 8;
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
const plantaDiezDto = new producto_salida_dto_1.ProductoSalidaDto(
  'Jazmín del Cabo',
  30000,
  'plantAI.com/imagenes/jazmindelcabo.jpg',
  'Planta ejemplo. Décima planta de la tienda',
  5,
  'Rubiáceas',
  categorias_1.FotoPeriodo.neutro,
  categorias_1.TipoRiego.regadera,
  true,
  'Blanco',
);
plantaDiezDto.id = 10;
plantaDiezDto.puntuacion = 5;
plantaDiezDto.unidadesVendidas = 8;
//# sourceMappingURL=productos.service.js.map
