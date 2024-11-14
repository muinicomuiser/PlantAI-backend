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
exports.GetMaceteroDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetMaceteroDto {
}
exports.GetMaceteroDto = GetMaceteroDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del producto',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetMaceteroDto.prototype, "idProducto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador de la marca',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetMaceteroDto.prototype, "idMarca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del tipo de macetero',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetMaceteroDto.prototype, "idTipoMacetero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'cemento',
        description: 'tipo de material',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetMaceteroDto.prototype, "material", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'redondo',
        description: 'forma del macetero',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetMaceteroDto.prototype, "forma", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'diametro del macetero',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetMaceteroDto.prototype, "diametro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'litros',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetMaceteroDto.prototype, "litros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marca' }),
    __metadata("design:type", String)
], GetMaceteroDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de macetero' }),
    __metadata("design:type", String)
], GetMaceteroDto.prototype, "tipoMacetero", void 0);
//# sourceMappingURL=get-macetero.dto.js.map