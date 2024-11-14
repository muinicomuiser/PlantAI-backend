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
exports.GetAccesorioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetAccesorioDto {
}
exports.GetAccesorioDto = GetAccesorioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del producto',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetAccesorioDto.prototype, "idProducto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador de la marca',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetAccesorioDto.prototype, "idMarca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del tipo de accesorio',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetAccesorioDto.prototype, "idTipoAccesorio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del color',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetAccesorioDto.prototype, "idColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca' }),
    __metadata("design:type", String)
], GetAccesorioDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de accesorio' }),
    __metadata("design:type", String)
], GetAccesorioDto.prototype, "tipoAccesorio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Color' }),
    __metadata("design:type", String)
], GetAccesorioDto.prototype, "color", void 0);
//# sourceMappingURL=get-accesorio.dto.js.map