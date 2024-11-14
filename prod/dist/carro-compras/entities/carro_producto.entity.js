"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroProducto = void 0;
const producto_entity_1 = require("../../productos/entities/producto.entity");
const carro_entity_1 = require("./carro.entity");
const typeorm_1 = require("typeorm");
let CarroProducto = class CarroProducto {
};
exports.CarroProducto = CarroProducto;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_carro' }),
    __metadata("design:type", Number)
], CarroProducto.prototype, "idCarro", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_producto' }),
    __metadata("design:type", Number)
], CarroProducto.prototype, "idProducto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_producto' }),
    __metadata("design:type", Number)
], CarroProducto.prototype, "cantidadProducto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => carro_entity_1.CarroCompra, (carro) => carro.carroProductos, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_carro' }),
    __metadata("design:type", carro_entity_1.CarroCompra)
], CarroProducto.prototype, "carro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], CarroProducto.prototype, "producto", void 0);
exports.CarroProducto = CarroProducto = __decorate([
    (0, typeorm_1.Entity)({ name: 'carros_productos' })
], CarroProducto);
//# sourceMappingURL=carro_producto.entity.js.map