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
exports.OutputPedidoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const carros_entity_1 = require("../../carro-compras/entities/carros.entity");
class OutputPedidoDto {
    constructor(idUsuario, estado, tipoDespacho, tipoPago, carrito) {
        this.id = 0;
        this.idUsuario = idUsuario;
        this.fechaCreacion = new Date();
        this.estado = estado;
        this.tipoDespacho = tipoDespacho;
        this.tipoPago = tipoPago;
        this.carrito = carrito;
        this.fechaEntrega = new Date();
    }
}
exports.OutputPedidoDto = OutputPedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OutputPedidoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OutputPedidoDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date() }),
    __metadata("design:type", Date)
], OutputPedidoDto.prototype, "fechaCreacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], OutputPedidoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], OutputPedidoDto.prototype, "tipoDespacho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], OutputPedidoDto.prototype, "tipoPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", carros_entity_1.CarroCompra)
], OutputPedidoDto.prototype, "carrito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date() }),
    __metadata("design:type", Date)
], OutputPedidoDto.prototype, "fechaEntrega", void 0);
//# sourceMappingURL=output-pedido.dto.js.map