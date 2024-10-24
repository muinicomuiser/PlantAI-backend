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
exports.CreateCarroCompraDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const get_producto_dto_1 = require("../../productos/dto/producto/get-producto.dto");
class CreateCarroCompraDto {
}
exports.CreateCarroCompraDto = CreateCarroCompraDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'idUsuario',
        description: 'Identificador del usuario',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCarroCompraDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'productos',
        description: 'Productos del carro de compras',
        type: [get_producto_dto_1.GetProductoDto],
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => get_producto_dto_1.GetProductoDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCarroCompraDto.prototype, "productos", void 0);
//# sourceMappingURL=create-carro-compra.dto.js.map