"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoMapperAux = void 0;
const get_producto_dto_1 = require("../dto/producto/get-producto.dto");
class ProductoMapperAux {
    static entityToDtoAux(producto) {
        console.log(producto);
        const productoDto = new get_producto_dto_1.GetProductoDto();
        productoDto.id = producto.id;
        productoDto.SKU = producto.SKU;
        productoDto.nombre = producto.nombre;
        productoDto.idCategoria = producto.idCategoria;
        productoDto.precio = producto.precio;
        productoDto.descripcion = producto.descripcion;
        productoDto.imagen = producto.imagen;
        productoDto.cantidad = producto.cantidad;
        productoDto.unidadesVendidas = producto.unidadesVendidas;
        productoDto.puntuacion = producto.puntuacion;
        productoDto.ancho = producto.ancho;
        productoDto.alto = producto.alto;
        productoDto.largo = producto.largo;
        productoDto.peso = producto.peso;
        return productoDto;
    }
}
exports.ProductoMapperAux = ProductoMapperAux;
//# sourceMappingURL=ent-to-dto-aux.js.map