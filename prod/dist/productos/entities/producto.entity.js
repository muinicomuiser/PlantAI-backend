'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Producto = void 0;
class Producto {
  constructor(
    nombre,
    precio,
    imagen = '',
    descripcion = '',
    cantidad = 0,
    familia = '',
    fotoperiodo = undefined,
    tipoRiego = undefined,
    petFriendly = false,
    color = '',
  ) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.unidadesVendidas = 0;
    this.puntuacion = 0;
    this.familia = familia;
    this.fotoperiodo = fotoperiodo;
    this.tipoRiego = tipoRiego;
    this.petFriendly = petFriendly;
    this.color = color;
  }
}
exports.Producto = Producto;
//# sourceMappingURL=producto.entity.js.map
