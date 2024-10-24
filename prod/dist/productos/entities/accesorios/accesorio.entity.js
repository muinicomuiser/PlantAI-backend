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
exports.Accesorio = void 0;
const marca_entity_1 = require("../../../commons/entities/marca.entity");
const producto_entity_1 = require("../producto.entity");
const tipo_accesorio_entity_1 = require("./tipo_accesorio.entity");
const typeorm_1 = require("typeorm");
const color_entity_1 = require("../../../commons/entities/color.entity");
let Accesorio = class Accesorio {
};
exports.Accesorio = Accesorio;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_producto' }),
    __metadata("design:type", Number)
], Accesorio.prototype, "idProducto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_marca' }),
    __metadata("design:type", Number)
], Accesorio.prototype, "idMarca", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_tipo_accesorio' }),
    __metadata("design:type", Number)
], Accesorio.prototype, "idTipoAccesorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_color' }),
    __metadata("design:type", Number)
], Accesorio.prototype, "idColor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], Accesorio.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => marca_entity_1.Marca),
    (0, typeorm_1.JoinColumn)({ name: 'id_marca' }),
    __metadata("design:type", marca_entity_1.Marca)
], Accesorio.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_accesorio_entity_1.TipoAccesorio),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_accesorio' }),
    __metadata("design:type", tipo_accesorio_entity_1.TipoAccesorio)
], Accesorio.prototype, "tipoAccesorio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.ColorProducto),
    (0, typeorm_1.JoinColumn)({ name: 'id_color' }),
    __metadata("design:type", color_entity_1.ColorProducto)
], Accesorio.prototype, "color", void 0);
exports.Accesorio = Accesorio = __decorate([
    (0, typeorm_1.Entity)({ name: 'accesorios' })
], Accesorio);
//# sourceMappingURL=accesorio.entity.js.map