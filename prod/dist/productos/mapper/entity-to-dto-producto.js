"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoMapper = void 0;
const get_producto_dto_1 = require("../dto/producto/get-producto.dto");
class ProductoMapper {
    static entityToDto(producto) {
        const productoDto = new get_producto_dto_1.GetProductoDto();
        productoDto.id = producto.id;
        productoDto.SKU = producto.SKU;
        productoDto.nombre = producto.nombre;
        productoDto.idCategoria = producto.categoria.id;
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
        if (producto.categoria) {
            productoDto.categoria = {
                id: producto.categoria.id,
                categoria: producto.categoria.categoria,
            };
            if (producto.planta) {
                productoDto.planta = {
                    id_producto: producto.planta.id_producto,
                    petFriendly: producto.planta.petFriendly,
                    toleranciaTemperatura: producto.planta.toleranciaTemperatura,
                    ciclo: producto.planta.ciclo,
                    altura: producto.planta.altura,
                    idEspecie: producto.planta.idEspecie,
                    idColor: producto.planta.idColor,
                    idFotoperiodo: producto.planta.idFotoperiodo,
                    idTipoRiego: producto.planta.idTipoRiego,
                    idHabitoCrecimiento: producto.planta.idHabitoCrecimiento,
                    habitoCrecimiento: producto.planta.habitoCrecimiento.crecimiento,
                    especie: producto.planta.especie.especie,
                    color: producto.planta.color.color,
                    fotoPeriodo: producto.planta.fotoPeriodo.tipoFotoperiodo,
                    tipoRiego: producto.planta.tipoRiego.tipoRiego,
                };
            }
        }
        if (producto.macetero) {
            productoDto.macetero = {
                idProducto: producto.macetero.idProducto,
                idMarca: producto.macetero.idMarca,
                idTipoMacetero: producto.macetero.idTipoMacetero,
                material: producto.macetero.material,
                forma: producto.macetero.forma,
                diametro: producto.macetero.diametro,
                litros: producto.macetero.litros,
                marca: producto.macetero.marca.nombre,
                tipoMacetero: producto.macetero.tipoMacetero.tipo,
            };
        }
        if (producto.accesorio) {
            console.log(producto);
            productoDto.accesorio = {
                idProducto: producto.accesorio.idProducto,
                idMarca: producto.accesorio.idMarca,
                idTipoAccesorio: producto.accesorio.idTipoAccesorio,
                idColor: producto.accesorio.idColor,
                marca: producto.accesorio.marca.nombre,
                tipoAccesorio: producto.accesorio.tipoAccesorio.tipo,
                color: producto.accesorio.color.color,
            };
        }
        if (producto.insumo) {
            productoDto.insumo = {
                idProducto: producto.insumo.idProducto,
                idTipoInsumo: producto.insumo.idTipoInsumo,
                idMarca: producto.insumo.idMarca,
                tipoInsumo: producto.insumo.tipoInsumo.tipoInsumo,
                marca: producto.insumo.marca.nombre,
            };
        }
        return productoDto;
    }
}
exports.ProductoMapper = ProductoMapper;
//# sourceMappingURL=entity-to-dto-producto.js.map