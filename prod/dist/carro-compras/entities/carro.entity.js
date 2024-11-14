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
exports.CarroCompra = void 0;
const pedido_entity_1 = require("../../pedidos/entities/pedido.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const carro_producto_entity_1 = require("./carro_producto.entity");
const typeorm_1 = require("typeorm");
let CarroCompra = class CarroCompra {
    constructor(idUsuario) {
        this.idUsuario = idUsuario;
        this.fecha_creacion = new Date();
    }
};
exports.CarroCompra = CarroCompra;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarroCompra.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_usuario' }),
    __metadata("design:type", Number)
], CarroCompra.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CarroCompra.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], CarroCompra.prototype, "fecha_cierre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.carros),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], CarroCompra.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => carro_producto_entity_1.CarroProducto, (carroProducto) => carroProducto.carro),
    __metadata("design:type", Array)
], CarroCompra.prototype, "carroProductos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pedido_entity_1.Pedido, (pedido) => pedido.carro),
    __metadata("design:type", pedido_entity_1.Pedido)
], CarroCompra.prototype, "pedido", void 0);
exports.CarroCompra = CarroCompra = __decorate([
    (0, typeorm_1.Entity)({ name: 'carros' }),
    __metadata("design:paramtypes", [Number])
], CarroCompra);
//# sourceMappingURL=carro.entity.js.map