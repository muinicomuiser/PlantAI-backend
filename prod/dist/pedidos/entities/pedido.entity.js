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
exports.Pedido = void 0;
const carros_entity_1 = require("../../carro-compras/entities/carros.entity");
const medio_pago_entity_1 = require("../../commons/entities/medio_pago.entity");
const estado_pedido_entity_1 = require("./estado_pedido.entity");
const tipo_despacho_entity_1 = require("./tipo_despacho.entity");
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const pagos_entity_1 = require("../../commons/entities/pagos.entity");
let Pedido = class Pedido {
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_usuario' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_creacion' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_medio_pago' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idMedioPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_estado' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idEstado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_tipo_despacho' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idTipoDespacho", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_carro' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idCarro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaEntrega", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Pedido.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medio_pago_entity_1.MedioPago),
    (0, typeorm_1.JoinColumn)({ name: 'id_medio_pago' }),
    __metadata("design:type", medio_pago_entity_1.MedioPago)
], Pedido.prototype, "medioPago", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estado_pedido_entity_1.EstadoPedido),
    (0, typeorm_1.JoinColumn)({ name: 'id_estado' }),
    __metadata("design:type", estado_pedido_entity_1.EstadoPedido)
], Pedido.prototype, "estadoPedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_despacho_entity_1.TipoDespacho),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_despacho' }),
    __metadata("design:type", tipo_despacho_entity_1.TipoDespacho)
], Pedido.prototype, "tipoDespacho", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => carros_entity_1.CarroCompra),
    (0, typeorm_1.JoinColumn)({ name: 'id_carro' }),
    __metadata("design:type", carros_entity_1.CarroCompra)
], Pedido.prototype, "carro", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pagos_entity_1.Pago, (pago) => pago.pedido),
    __metadata("design:type", pagos_entity_1.Pago)
], Pedido.prototype, "Pago", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)({ name: 'pedidos' })
], Pedido);
//# sourceMappingURL=pedido.entity.js.map