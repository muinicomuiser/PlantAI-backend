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
exports.UsuarioMedioPago = void 0;
const medio_pago_entity_1 = require("../../commons/entities/medio_pago.entity");
const usuario_entity_1 = require("./usuario.entity");
const typeorm_1 = require("typeorm");
let UsuarioMedioPago = class UsuarioMedioPago {
};
exports.UsuarioMedioPago = UsuarioMedioPago;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_usuario' }),
    __metadata("design:type", Number)
], UsuarioMedioPago.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id_medio_pago' }),
    __metadata("design:type", Number)
], UsuarioMedioPago.prototype, "idMedioPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_preferido' }),
    __metadata("design:type", Boolean)
], UsuarioMedioPago.prototype, "esPreferido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], UsuarioMedioPago.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medio_pago_entity_1.MedioPago),
    (0, typeorm_1.JoinColumn)({ name: 'id_medio_pago' }),
    __metadata("design:type", medio_pago_entity_1.MedioPago)
], UsuarioMedioPago.prototype, "medioPago", void 0);
exports.UsuarioMedioPago = UsuarioMedioPago = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios_medios_pagos' })
], UsuarioMedioPago);
//# sourceMappingURL=usuarios_medio_pago.entity.js.map