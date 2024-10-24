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
exports.Pago = void 0;
const pedido_entity_1 = require("../../pedidos/entities/pedido.entity");
const medio_pago_entity_1 = require("./medio_pago.entity");
const typeorm_1 = require("typeorm");
let Pago = class Pago {
};
exports.Pago = Pago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pago.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_medio_pago' }),
    __metadata("design:type", Number)
], Pago.prototype, "idMedioPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], Pago.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Pago.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pago.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => medio_pago_entity_1.MedioPago),
    (0, typeorm_1.JoinColumn)({ name: 'id_medio_pago' }),
    __metadata("design:type", medio_pago_entity_1.MedioPago)
], Pago.prototype, "medioPago", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pedido_entity_1.Pedido),
    (0, typeorm_1.JoinColumn)({ name: 'id_pedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], Pago.prototype, "pedido", void 0);
exports.Pago = Pago = __decorate([
    (0, typeorm_1.Entity)({ name: 'pagos' })
], Pago);
//# sourceMappingURL=pagos.entity.js.map