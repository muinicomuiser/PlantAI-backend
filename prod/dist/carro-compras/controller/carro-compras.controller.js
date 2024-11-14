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
const swagger_1 = require("@nestjs/swagger");
const get_carro_compras_dto_1 = require("../dto/get-carro-compras.dto");
const carro_compras_service_1 = require("../service/carro-compras.service");
const validar_carro_existe_pipe_1 = require("../pipe/validar-carro-existe.pipe");
const add_product_carro_1 = require("../dto/add-product-carro");
const update_product_carro_1 = require("../dto/update-product-carro");
const validar_producto_existente_pipe_1 = require("../pipe/validar-producto-existente.pipe");
const validar_carro_activo_existente_pipe_1 = require("../pipe/validar-carro-activo-existente.pipe");
const validar_usuario_existe_pipe_1 = require("../../usuarios/pipe/validar-usuario-existe.pipe");
let CarroComprasController = class CarroComprasController {
    constructor(carroComprasService) {
        this.carroComprasService = carroComprasService;
    }
    async findByCarroId(id) {
        return await this.carroComprasService.findByCarroId(+id);
    }
    async findByUserId(id) {
        return await this.carroComprasService.findByUserId(+id);
    }
    createCarro(idUsuario) {
        return this.carroComprasService.createCarro(idUsuario);
    }
    deleteCarro(idCarro) {
        return this.carroComprasService.deleteCarro(idCarro);
    }
    async addProductToCarro(idCarro, addProductDto) {
        return await this.carroComprasService.addProductToCarro(idCarro, addProductDto);
    }
    async updateProductQuantity(idCarro, updateDto) {
        return await this.carroComprasService.updateProductQuantity(idCarro, updateDto);
    }
    async removeProductCarro(idCarro, idProducto) {
        return await this.carroComprasService.removeProductCarro(idCarro, idProducto);
    }
};
exports.CarroComprasController = CarroComprasController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca un carro de compras por id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carro encontrado',
        type: get_carro_compras_dto_1.GetCarroComprasDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, validar_carro_existe_pipe_1.ValidarCarroExistePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarroComprasController.prototype, "findByCarroId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca un carro de compras por id de usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carro encontrado',
        type: get_carro_compras_dto_1.GetCarroComprasDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, validar_usuario_existe_pipe_1.ValidarUsuarioExistePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarroComprasController.prototype, "findByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crea un carro de compras' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Carro creado' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Error al crear carro. El usuario no puede tener más de un carro activo.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No existe un usuario con el ID' }),
    (0, common_1.Post)(':idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe, validar_usuario_existe_pipe_1.ValidarUsuarioExistePipe, validar_carro_activo_existente_pipe_1.ValidarCarroActivoPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "createCarro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Borra un carro de compras' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carro borrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carro no encontrado' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe, validar_carro_existe_pipe_1.ValidarCarroExistePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarroComprasController.prototype, "deleteCarro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Agrega un producto al carro de compras' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto agregado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Producto no ha sido agregado' }),
    (0, swagger_1.ApiBody)({ type: add_product_carro_1.AddProductCarro }),
    (0, common_1.Post)('add/:idCarro'),
    __param(0, (0, common_1.Param)('idCarro', common_1.ParseIntPipe, validar_carro_existe_pipe_1.ValidarCarroExistePipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_product_carro_1.AddProductCarro]),
    __metadata("design:returntype", Promise)
], CarroComprasController.prototype, "addProductToCarro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza la cantidad de un producto determinado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cantidad actualizada' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'No ha sido actualizada la cantidad',
    }),
    (0, swagger_1.ApiBody)({ type: update_product_carro_1.UpdateProductCarro }),
    (0, common_1.Patch)('updateProducto/:idCarro'),
    __param(0, (0, common_1.Param)('idCarro', common_1.ParseIntPipe, validar_carro_existe_pipe_1.ValidarCarroExistePipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_carro_1.UpdateProductCarro]),
    __metadata("design:returntype", Promise)
], CarroComprasController.prototype, "updateProductQuantity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un producto del carro' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto eliminado del carro' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'El producto no ha podido ser eliminado',
    }),
    (0, common_1.Delete)('remove/:idCarro/:idProducto'),
    __param(0, (0, common_1.Param)('idCarro', common_1.ParseIntPipe, validar_carro_existe_pipe_1.ValidarCarroExistePipe)),
    __param(1, (0, common_1.Param)('idProducto', common_1.ParseIntPipe, validar_producto_existente_pipe_1.ProductoExistentePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CarroComprasController.prototype, "removeProductCarro", null);
exports.CarroComprasController = CarroComprasController = __decorate([
    (0, swagger_1.ApiTags)('Carro de compras'),
    (0, common_1.Controller)('carro-compras'),
    __metadata("design:paramtypes", [carro_compras_service_1.CarroComprasService])
], CarroComprasController);
//# sourceMappingURL=carro-compras.controller.js.map