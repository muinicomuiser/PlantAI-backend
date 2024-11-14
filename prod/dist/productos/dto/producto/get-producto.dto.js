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
exports.GetProductoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const get_categoria_dto_1 = require("../categoria/get-categoria.dto");
const get_planta_dto_1 = require("../planta/get-planta.dto");
const get_macetero_dto_1 = require("../macetero/get-macetero.dto");
const get_accesorio_dto_1 = require("../accesorio/get-accesorio.dto");
const get_insumo_dto_1 = require("../insumo/get-insumo.dto");
class GetProductoDto {
}
exports.GetProductoDto = GetProductoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador único del producto' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ABC123', description: 'SKU del producto' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductoDto.prototype, "SKU", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Macetero de cerámica',
        description: 'Nombre del producto',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Identificador de la categoría del producto',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "idCategoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000.5, description: 'Precio del producto' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Macetero hecho a mano',
        description: 'Descripción detallada del producto',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'macetero.jpg',
        description: 'URL de la imagen del producto',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetProductoDto.prototype, "imagen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Cantidad disponible del producto' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Número de unidades vendidas del producto',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "unidadesVendidas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4.5,
        description: 'Puntuación promedio del producto',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "puntuacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Ancho del producto en milimetros',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "ancho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Alto del producto en milimetros' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "alto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'Largo del producto en milimetros',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "largo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5, description: 'Peso del producto en kilogramos' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GetProductoDto.prototype, "peso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: get_categoria_dto_1.GetCategoriaDto,
        description: 'Información de la categoría asociada al producto',
    }),
    __metadata("design:type", get_categoria_dto_1.GetCategoriaDto)
], GetProductoDto.prototype, "categoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: get_planta_dto_1.GetPlantaDto,
        description: 'Información de la planta asociada al producto',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", get_planta_dto_1.GetPlantaDto)
], GetProductoDto.prototype, "planta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: get_macetero_dto_1.GetMaceteroDto,
        description: 'Información del macetero asociado al producto',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", get_macetero_dto_1.GetMaceteroDto)
], GetProductoDto.prototype, "macetero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: get_accesorio_dto_1.GetAccesorioDto,
        description: 'Información del accesorio asociado al producto',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", get_accesorio_dto_1.GetAccesorioDto)
], GetProductoDto.prototype, "accesorio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: get_insumo_dto_1.GetInsumoDto,
        description: 'Información del insumo asociado al producto',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", get_insumo_dto_1.GetInsumoDto)
], GetProductoDto.prototype, "insumo", void 0);
//# sourceMappingURL=get-producto.dto.js.map