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
exports.GetPlantaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetPlantaDto {
}
exports.GetPlantaDto = GetPlantaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador único del producto' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "id_producto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la planta es amigable con las mascotas',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetPlantaDto.prototype, "petFriendly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Tolerancia de temperatura' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "toleranciaTemperatura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la planta es de ciclo',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetPlantaDto.prototype, "ciclo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1.5m',
        description: 'Altura de la planta',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPlantaDto.prototype, "altura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador de la especie de la planta',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "idEspecie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del color de la planta',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "idColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del fotoperiodo de la planta',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "idFotoperiodo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del tipo de riego de la planta',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "idTipoRiego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador del hábito de crecimiento de la planta',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetPlantaDto.prototype, "idHabitoCrecimiento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'especie de la planta' }),
    __metadata("design:type", String)
], GetPlantaDto.prototype, "especie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Color de la planta' }),
    __metadata("design:type", String)
], GetPlantaDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fotoperiodo de la planta',
    }),
    __metadata("design:type", String)
], GetPlantaDto.prototype, "fotoPeriodo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de riego de la planta',
    }),
    __metadata("design:type", String)
], GetPlantaDto.prototype, "tipoRiego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hábito de crecimiento de la planta',
    }),
    __metadata("design:type", String)
], GetPlantaDto.prototype, "habitoCrecimiento", void 0);
//# sourceMappingURL=get-planta.dto.js.map