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
exports.Macetero = void 0;
const marca_entity_1 = require("../../../commons/entities/marca.entity");
const producto_entity_1 = require("../producto.entity");
const tipo_macetero_entity_1 = require("./tipo_macetero.entity");
const typeorm_1 = require("typeorm");
let Macetero = class Macetero {
};
exports.Macetero = Macetero;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_producto' }),
    __metadata("design:type", Number)
], Macetero.prototype, "idProducto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Macetero.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Macetero.prototype, "forma", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Macetero.prototype, "diametro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_marca' }),
    __metadata("design:type", Number)
], Macetero.prototype, "idMarca", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_tipo_macetero' }),
    __metadata("design:type", Number)
], Macetero.prototype, "idTipoMacetero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Macetero.prototype, "litros", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], Macetero.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => marca_entity_1.Marca),
    (0, typeorm_1.JoinColumn)({ name: 'id_marca' }),
    __metadata("design:type", marca_entity_1.Marca)
], Macetero.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_macetero_entity_1.TipoMacetero),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_macetero' }),
    __metadata("design:type", tipo_macetero_entity_1.TipoMacetero)
], Macetero.prototype, "tipoMacetero", void 0);
exports.Macetero = Macetero = __decorate([
    (0, typeorm_1.Entity)({ name: 'maceteros' })
], Macetero);
//# sourceMappingURL=macetero.entity.js.map