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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosController = void 0;
const common_1 = require("@nestjs/common");
const create_pedido_dto_1 = require("../dto/create-pedido.dto");
const swagger_1 = require("@nestjs/swagger");
const update_pedido_dto_1 = require("../dto/update-pedido.dto");
const get_pedido_dto_1 = require("../dto/get-pedido.dto");
const pedidos_service_1 = require("../service/pedidos.service");
const delete_pedido_dto_1 = require("../dto/delete-pedido.dto");
let PedidosController = class PedidosController {
    constructor(pedidosService) {
        this.pedidosService = pedidosService;
    }
    create(createPedidoDTO) {
        return this.pedidosService.create(createPedidoDTO);
    }
    findAll(estado) {
        return this.pedidosService.findAll();
    }
    findOne(id) {
        return this.pedidosService.findOne(+id);
    }
    update(id, updatePedidoDto) {
        return this.pedidosService.update(+id, updatePedidoDto);
    }
    remove(id) {
        return this.pedidosService.remove(+id);
    }
};
exports.PedidosController = PedidosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crea un pedido' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido creado con éxito',
        type: get_pedido_dto_1.GetPedidoDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Problemas para crear el pedido' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pedido_dto_1.CreatePedidoDto]),
    __metadata("design:returntype", Promise)
], PedidosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Filtra pedidos por estado o entrega todos los pedidos',
    }),
    (0, swagger_1.ApiQuery)({ name: 'Estado', required: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedidos filtrados por estado o todos los pedidos',
        type: get_pedido_dto_1.GetPedidoDto,
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('Estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PedidosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca pedidos por id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido encotrado',
        type: get_pedido_dto_1.GetPedidoDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido no encontrado' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidosController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Modifica pedidos por id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido modificado',
        type: get_pedido_dto_1.GetPedidoDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido no encontrado' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pedido_dto_1.UpdatePedidoDto]),
    __metadata("design:returntype", Promise)
], PedidosController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Elimina pedidos por id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido eliminado',
        type: delete_pedido_dto_1.DeletePedidoResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido no encontrado' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidosController.prototype, "remove", null);
exports.PedidosController = PedidosController = __decorate([
    (0, swagger_1.ApiTags)('Pedidos'),
    (0, common_1.Controller)('pedidos'),
    __metadata("design:paramtypes", [pedidos_service_1.PedidosService])
], PedidosController);
//# sourceMappingURL=pedidos.controller.js.map