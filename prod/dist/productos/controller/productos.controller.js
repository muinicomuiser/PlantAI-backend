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
exports.ProductosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const productos_service_1 = require("../service/productos.service");
const get_producto_dto_1 = require("../dto/producto/get-producto.dto");
const update_producto_dto_1 = require("../dto/producto/update-producto.dto");
const create_producto_dto_1 = require("../dto/producto/create-producto.dto");
const validar_producto_existente_pipe_1 = require("../../carro-compras/pipe/validar-producto-existente.pipe");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    async getById(id) {
        return await this.productosService.getById(+id);
    }
    createProduct(createProductoDto) {
        return this.productosService.create(createProductoDto);
    }
    updateProduct(id, updateProductoDto) {
        return this.productosService.update(id, updateProductoDto);
    }
    deleteOne(id) {
        return this.productosService.deleteOne(id);
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca un producto por su id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna el producto que coincida con el id.',
        type: get_producto_dto_1.GetProductoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se encuentra un producto registrado con ese id',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crea un producto.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Agrega un producto al sistema.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'No ha sido posible crear el producto',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_dto_1.CreateProductoDto]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un producto.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Actualiza un producto.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se ha encontrado un producto con ese id.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', validar_producto_existente_pipe_1.ProductoExistentePipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_producto_dto_1.UpdateProductoDto]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un producto según su id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Producto eliminado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No existe un producto con ese id',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validar_producto_existente_pipe_1.ProductoExistentePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "deleteOne", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('Gestión de productos'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map