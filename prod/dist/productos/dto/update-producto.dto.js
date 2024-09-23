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
exports.UpdateProductoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_producto_dto_1 = require("./create-producto.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const categorias_1 = require("../entities/categorias");
class UpdateProductoDto extends (0, mapped_types_1.PartialType)(create_producto_dto_1.CreateProductoDto) {
}
exports.UpdateProductoDto = UpdateProductoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Agatea Verde' }),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre no puede estar vacío' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 5000 }),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El precio debe ser un número entero.' }),
    __metadata("design:type", Number)
], UpdateProductoDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'plantAI.com/imagenes/agatea.jpg' }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "imagen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Producto ejemplo. Quinta planta de la tienda' }),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 15 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductoDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Aesteraceae' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "familia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "neutral" }),
    (0, class_validator_1.IsEnum)(categorias_1.FotoPeriodo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "fotoperiodo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: "regadera" }),
    (0, class_validator_1.IsEnum)(categorias_1.TipoRiego),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "tipoRiego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProductoDto.prototype, "petFriendly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'verde' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductoDto.prototype, "color", void 0);
//# sourceMappingURL=update-producto.dto.js.map