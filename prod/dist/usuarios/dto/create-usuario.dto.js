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
exports.CreateUsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clave1234' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'La contraseña no puede tener más de 50 caracteres',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "contrasena", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juanito' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'El nombre no puede tener más de 50 caracteres',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Smith' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'El apellido no puede tener más de 50 caracteres',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juanelo Rabioso' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'El nombre usuario no puede tener más de 50 caracteres',
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombreUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bulbasaur1991@hotmail.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '98745632' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]+$/, {
        message: 'El teléfono solo debe contener números',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Masculino' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50, {
        message: 'El género no puede tener más de 50 caracteres',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11111111-1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{7,8}-[0-9kK]$/, {
        message: 'El RUT debe tener el formato 11111111-1 o 1111111-1',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "rut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1991-12-25' }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateUsuarioDto.prototype, "tipoUsuarioId", void 0);
//# sourceMappingURL=create-usuario.dto.js.map