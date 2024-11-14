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
exports.OutputUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class OutputUserDTO {
}
exports.OutputUserDTO = OutputUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OutputUserDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jhon' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Smith' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jhon.smith' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "nombreUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jhon.smith@gmail.com' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Masculino' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678-9' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "rut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1999-12-12' }),
    __metadata("design:type", Date)
], OutputUserDTO.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cliente' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "tipoUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Calle Falsa 123', 'Avenida Siempreviva 742'] }),
    __metadata("design:type", Array)
], OutputUserDTO.prototype, "direcciones", void 0);
//# sourceMappingURL=output-userDTO.js.map