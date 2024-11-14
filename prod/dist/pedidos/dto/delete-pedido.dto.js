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
exports.DeletePedidoResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const delete_result_dto_1 = require("./delete-result.dto");
const get_pedido_dto_1 = require("./get-pedido.dto");
class DeletePedidoResponseDto {
}
exports.DeletePedidoResponseDto = DeletePedidoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: delete_result_dto_1.DeleteResultDto }),
    __metadata("design:type", delete_result_dto_1.DeleteResultDto)
], DeletePedidoResponseDto.prototype, "deleteResult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: get_pedido_dto_1.GetPedidoDto }),
    __metadata("design:type", get_pedido_dto_1.GetPedidoDto)
], DeletePedidoResponseDto.prototype, "pedido", void 0);
//# sourceMappingURL=delete-pedido.dto.js.map