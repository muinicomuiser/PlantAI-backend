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
exports.Planta = void 0;
const color_entity_1 = require("../../../commons/entities/color.entity");
const producto_entity_1 = require("../producto.entity");
const especie_entity_1 = require("./especie.entity");
const tipo_riego_entity_1 = require("./tipo_riego.entity");
const fotoperiodo_entity_1 = require("./fotoperiodo.entity");
const habito_crecimiento_entity_1 = require("./habito_crecimiento.entity");
const typeorm_1 = require("typeorm");
let Planta = class Planta {
};
exports.Planta = Planta;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Planta.prototype, "id_producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pet_friendly' }),
    __metadata("design:type", Boolean)
], Planta.prototype, "petFriendly", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tolerancia_temperatura' }),
    __metadata("design:type", Number)
], Planta.prototype, "toleranciaTemperatura", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Planta.prototype, "ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Planta.prototype, "altura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_especie' }),
    __metadata("design:type", Number)
], Planta.prototype, "idEspecie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especie_entity_1.Especie),
    (0, typeorm_1.JoinColumn)({ name: 'id_especie' }),
    __metadata("design:type", especie_entity_1.Especie)
], Planta.prototype, "especie", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_color' }),
    __metadata("design:type", Number)
], Planta.prototype, "idColor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => color_entity_1.ColorProducto),
    (0, typeorm_1.JoinColumn)({ name: 'id_color' }),
    __metadata("design:type", color_entity_1.ColorProducto)
], Planta.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_fotoperiodo' }),
    __metadata("design:type", Number)
], Planta.prototype, "idFotoperiodo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fotoperiodo_entity_1.Fotoperiodo),
    (0, typeorm_1.JoinColumn)({ name: 'id_fotoperiodo' }),
    __metadata("design:type", fotoperiodo_entity_1.Fotoperiodo)
], Planta.prototype, "fotoPeriodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_tipo_riego' }),
    __metadata("design:type", Number)
], Planta.prototype, "idTipoRiego", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_riego_entity_1.TipoRiego),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_riego' }),
    __metadata("design:type", tipo_riego_entity_1.TipoRiego)
], Planta.prototype, "tipoRiego", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_habito_crecimiento' }),
    __metadata("design:type", Number)
], Planta.prototype, "idHabitoCrecimiento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => habito_crecimiento_entity_1.HabitoCrecimiento),
    (0, typeorm_1.JoinColumn)({ name: 'id_habito_crecimiento' }),
    __metadata("design:type", habito_crecimiento_entity_1.HabitoCrecimiento)
], Planta.prototype, "habitoCrecimiento", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => producto_entity_1.Producto, (producto) => producto.planta),
    (0, typeorm_1.JoinColumn)({ name: 'id_producto' }),
    __metadata("design:type", producto_entity_1.Producto)
], Planta.prototype, "producto", void 0);
exports.Planta = Planta = __decorate([
    (0, typeorm_1.Entity)({ name: 'plantas' })
], Planta);
//# sourceMappingURL=planta.entity.js.map