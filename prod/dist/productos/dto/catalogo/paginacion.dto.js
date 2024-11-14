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
exports.PaginacionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PaginacionDto {
}
exports.PaginacionDto = PaginacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Número de página' }),
    (0, class_validator_1.IsInt)({ message: 'El número de página debe ser un entero.' }),
    (0, class_validator_1.Min)(1, { message: 'El número de la página debe ser al menos 1' }),
    __metadata("design:type", Number)
], PaginacionDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Cantidad de elementos por página' }),
    (0, class_validator_1.IsInt)({ message: 'Los elementos por página deben ser número entero' }),
    (0, class_validator_1.Min)(1, { message: 'Las páginas deben mostrar al menos 1 elemento' }),
    __metadata("design:type", Number)
], PaginacionDto.prototype, "pageSize", void 0);
//# sourceMappingURL=paginacion.dto.js.map