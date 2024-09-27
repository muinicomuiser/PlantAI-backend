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
exports.CarroComprasController = void 0;
const common_1 = require("@nestjs/common");
const carro_compras_service_1 = require("../service/carro-compras.service");
const create_carro_compra_dto_1 = require("../dto/create-carro-compra.dto");
const swagger_1 = require("@nestjs/swagger");
const update_carro_compra_dto_1 = require("../dto/update-carro-compra.dto");
const output_carro_compras_dto_1 = require("../dto/output-carro-compras.dto");
let CarroComprasController = class CarroComprasController {
    constructor(carroComprasService) {
        this.carroComprasService = carroComprasService;
    }
    createCarro(carro) {
        return this.carroComprasService.createCarro(carro);
    }
    findByCarroId(id) {
        return this.carroComprasService.findByCarroId(id);
    }
    findByUserId(id) {
        return this.carroComprasService.findByUserId(id);
    }
    deleteCarro(id) {
        return this.carroComprasService.deleteCarro(id);
    }
    updateCarro(carro, id) {
        return this.carroComprasService.updateCarro(id, carro);
    }
};
exports.CarroComprasController = CarroComprasController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crea un carro de compras' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Carro creado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error al crear carro' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_carro_compra_dto_1.CreateCarroCompraDto]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "createCarro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca un carro de compras por id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carro encontrado', type: output_carro_compras_dto_1.OutputCarroComprasDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "findByCarroId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca un carro de compras por id de usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carro encontrado', type: output_carro_compras_dto_1.OutputCarroComprasDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "findByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Borra un carro de compras' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carro borrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "deleteCarro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un carro de compras' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carro actualizado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_carro_compra_dto_1.UpdateCarroCompraDto, Number]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "updateCarro", null);
exports.CarroComprasController = CarroComprasController = __decorate([
    (0, swagger_1.ApiTags)('Carro de compras'),
    (0, common_1.Controller)('carro-compras'),
    __metadata("design:paramtypes", [carro_compras_service_1.CarroComprasService])
], CarroComprasController);
//# sourceMappingURL=carro-compras.controller.js.map