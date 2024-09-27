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
const output_carro_compras_dto_1 = require("../../carro-compras/dto/output-carro-compras.dto");
class OutputUserDTO {
    constructor(name, email, carrito, pedido) {
        this.name = name;
        this.email = email;
        this.carrito = carrito;
        this.pedidos = pedido;
    }
}
exports.OutputUserDTO = OutputUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New Name' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'updateduser@gmail.com' }),
    __metadata("design:type", String)
], OutputUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", output_carro_compras_dto_1.OutputCarroComprasDto)
], OutputUserDTO.prototype, "carrito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], OutputUserDTO.prototype, "pedidos", void 0);
//# sourceMappingURL=output-userDTO.js.map