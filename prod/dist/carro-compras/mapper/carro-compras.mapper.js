"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroComprasMapper = void 0;
const entity_to_dto_producto_1 = require("../../productos/mapper/entity-to-dto-producto");
const get_carro_producto_dto_1 = require("../dto/get-carro-producto.dto");
const get_carro_compras_dto_1 = require("../dto/get-carro-compras.dto");
class CarroComprasMapper {
    static carroProductoEntityToDto(carroProducto) {
        const carroProductoDto = new get_carro_producto_dto_1.GetCarroProductoDto();
        carroProductoDto.cantidadProducto = carroProducto.cantidadProducto;
        carroProductoDto.producto = entity_to_dto_producto_1.ProductoMapper.entityToDto(carroProducto.producto);
        return carroProductoDto;
    }
    static arrayCarroProductosEntityToDto(carroProductos) {
        return carroProductos.map((carroProducto) => this.carroProductoEntityToDto(carroProducto));
    }
    static carroEntityToDto(carro) {
        const carroDto = new get_carro_compras_dto_1.GetCarroComprasDto();
        carroDto.carroProductos = this.arrayCarroProductosEntityToDto(carro.carroProductos);
        carroDto.id = carro.id;
        carroDto.idUsuario = carro.idUsuario;
        carroDto.precioTotal = carroDto.carroProductos.reduce((acumulador, valorActual) => acumulador + valorActual.producto.precio * valorActual.cantidadProducto, 0);
        return carroDto;
    }
}
exports.CarroComprasMapper = CarroComprasMapper;
//# sourceMappingURL=carro-compras.mapper.js.map