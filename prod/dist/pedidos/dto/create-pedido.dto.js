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
exports.CreatePedidoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePedidoDto {
}
exports.CreatePedidoDto = CreatePedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Identificador del usuario' }),
    (0, class_validator_1.IsInt)({ message: 'El idUsuario debe ser un número entero' }),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-10-12',
        description: 'Fecha de creación del pedido',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.fechaCreacion),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata("design:type", Date)
], CreatePedidoDto.prototype, "fechaCreacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador del medio de pago' }),
    (0, class_validator_1.IsInt)({ message: 'El idMedioPago debe ser un número entero' }),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idMedioPago", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El idEstado debe ser un número entero' }),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del estado del pedido',
    }),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idEstado", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El idTipoDespacho debe ser un número entero' }),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del tipo de despacho',
    }),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idTipoDespacho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del carro de compra',
    }),
    (0, class_validator_1.IsInt)({ message: 'El idCarro debe ser un número entero' }),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idCarro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-10-15',
        description: 'Fecha de entrega del pedido al cliente',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.fechaCreacion),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value), { toClassOnly: true }),
    __metadata("design:type", Date)
], CreatePedidoDto.prototype, "fechaEntrega", void 0);
//# sourceMappingURL=create-pedido.dto.js.map