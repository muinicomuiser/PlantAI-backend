"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CARRO_PRODUCTOS_RELATIONS = exports.CARRO_RELATIONS = void 0;
const producto_relaciones_1 = require("../../../productos/shared/constants/producto-relaciones");
exports.CARRO_RELATIONS = producto_relaciones_1.PRODUCTO_RELATIONS.map((relacionProducto) => `carroProductos.producto.${relacionProducto}`);
exports.CARRO_PRODUCTOS_RELATIONS = producto_relaciones_1.PRODUCTO_RELATIONS.map((relacionProducto) => `producto.${relacionProducto}`);
//# sourceMappingURL=carro-relaciones.js.map