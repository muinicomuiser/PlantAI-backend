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
const producto_salida_dto_1 = require("../dto/producto-salida.dto");
const categorias_1 = require("../entities/categorias");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    getById(id) {
        return this.productosService.getById(+id);
    }
    getByFilters(nombre, familia, fotoperiodo, tipoRiego, petFriendly, color) {
        return this.productosService.getByFilters();
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca un producto por su id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna el producto que coincida con el id.',
        type: producto_salida_dto_1.ProductoSalidaDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se encuentra un producto registrado con ese id',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca productos por filtros.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Devuelve todos los productos que coincidan con los parámetros. Si no hay parámetros, los devuelve todos.',
        type: producto_salida_dto_1.ProductoSalidaDto,
    }),
    (0, swagger_1.ApiQuery)({ name: 'nombre', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'familia', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'fotoperiodo', enum: categorias_1.FotoPeriodo, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tiporiego', enum: categorias_1.TipoRiego, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'petfriendly', enum: ['true', 'false'], required: false }),
    (0, swagger_1.ApiQuery)({ name: 'color', required: false }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('nombre')),
    __param(1, (0, common_1.Query)('familia')),
    __param(2, (0, common_1.Query)('fotoperiodo')),
    __param(3, (0, common_1.Query)('tiporiego')),
    __param(4, (0, common_1.Query)('petfriendly')),
    __param(5, (0, common_1.Query)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "getByFilters", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('Búsqueda de productos'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map