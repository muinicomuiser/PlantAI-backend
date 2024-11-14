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
exports.GetPedidoDto = void 0;
const medio_pago_entity_1 = require("../../commons/entities/medio_pago.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const estado_pedido_entity_1 = require("../entities/estado_pedido.entity");
const tipo_despacho_entity_1 = require("../entities/tipo_despacho.entity");
const carro_entity_1 = require("../../carro-compras/entities/carro.entity");
const pagos_entity_1 = require("../../commons/entities/pagos.entity");
const swagger_1 = require("@nestjs/swagger");
class GetPedidoDto {
}
exports.GetPedidoDto = GetPedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador del pedido' }),
    __metadata("design:type", Number)
], GetPedidoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador del usuario' }),
    __metadata("design:type", Number)
], GetPedidoDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2021-10-12',
        description: 'Fecha de creación del pedido',
    }),
    __metadata("design:type", Date)
], GetPedidoDto.prototype, "fechaCreacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador del medio de pago' }),
    __metadata("design:type", Number)
], GetPedidoDto.prototype, "idMedioPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del estado del pedido',
    }),
    __metadata("design:type", Number)
], GetPedidoDto.prototype, "idEstado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del tipo de despacho',
    }),
    __metadata("design:type", Number)
], GetPedidoDto.prototype, "idTipoDespacho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador del carro de compra' }),
    __metadata("design:type", Number)
], GetPedidoDto.prototype, "idCarro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2021-10-15',
        description: 'Fecha de entrega del pedido al cliente',
    }),
    __metadata("design:type", Date)
], GetPedidoDto.prototype, "fechaEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", usuario_entity_1.Usuario)
], GetPedidoDto.prototype, "usuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", medio_pago_entity_1.MedioPago)
], GetPedidoDto.prototype, "medioPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", estado_pedido_entity_1.EstadoPedido)
], GetPedidoDto.prototype, "estadoPedido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", tipo_despacho_entity_1.TipoDespacho)
], GetPedidoDto.prototype, "tipoDespacho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", carro_entity_1.CarroCompra)
], GetPedidoDto.prototype, "carro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", pagos_entity_1.Pago)
], GetPedidoDto.prototype, "Pago", void 0);
//# sourceMappingURL=get-pedido.dto.js.map