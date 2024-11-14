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
exports.CreateProductoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProductoDto {
}
exports.CreateProductoDto = CreateProductoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SKU del producto', example: 'AGT-001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "SKU", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del producto', example: 'Agatea Verde' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la categoría', example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "idCategoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Precio del producto', example: 1000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del producto',
        example: 'Planta de interior',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL de la imagen del producto',
        example: 'https://www.plantAI.com/imagenes/agatea.jpg',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "imagen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cantidad disponible del producto', example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unidades vendidas del producto', example: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "unidadesVendidas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Puntuación del producto',
        minimum: 0,
        maximum: 5,
        example: 3,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "puntuacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ancho del producto en cm', example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "ancho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alto del producto en cm', example: 20 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "alto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Largo del producto en cm', example: 30 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "largo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso del producto en kg', example: 0.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "peso", void 0);
//# sourceMappingURL=create-producto.dto.js.map