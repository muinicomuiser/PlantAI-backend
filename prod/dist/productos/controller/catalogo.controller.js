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
exports.CatalogoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_producto_dto_1 = require("../dto/producto/get-producto.dto");
const catalogo_service_1 = require("../service/catalogo.service");
let CatalogoController = class CatalogoController {
    constructor(catalogoService) {
        this.catalogoService = catalogoService;
    }
    findAll(page = 1, pageSize = 10) {
        const paginacionDto = { page, pageSize };
        return this.catalogoService.findAll(paginacionDto);
    }
    findBestSellers() {
        return this.catalogoService.findBestSellers();
    }
    findByRating(puntuacion) {
        return this.catalogoService.findByRating(puntuacion);
    }
    findRecommended(id) {
        return this.catalogoService.findRecommended(id);
    }
    filterbyPrice(minPrice, maxPrice) {
        const min = +minPrice;
        const max = +maxPrice;
        return this.catalogoService.filterByPrice(min, max);
    }
};
exports.CatalogoController = CatalogoController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los productos del catálogo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna todos los productos del catálogo',
        type: get_producto_dto_1.GetProductoDto,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se encontraron los productos',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Número de página' }),
    (0, swagger_1.ApiQuery)({
        name: 'pageSize',
        required: false,
        description: 'Cantidad de elementos por página',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.ParseIntPipe({ errorHttpStatusCode: 400 }))),
    __param(1, (0, common_1.Query)('pageSize', new common_1.ParseIntPipe({ errorHttpStatusCode: 400 }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CatalogoController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener los productos más vendidos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna los productos más vendidos',
        type: get_producto_dto_1.GetProductoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Productos más vendidos no encontrados',
    }),
    (0, common_1.Get)('mas-vendidos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogoController.prototype, "findBestSellers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener productos por puntuación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna los productos con la puntuación especificada',
        type: get_producto_dto_1.GetProductoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Productos con la puntuación especificada no encontrados',
    }),
    (0, swagger_1.ApiParam)({
        name: 'puntuacion',
        description: 'Puntuación del producto en una escala del 1 al 10',
        example: 5,
    }),
    (0, common_1.Get)('puntuacion/:puntuacion'),
    __param(0, (0, common_1.Param)('puntuacion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogoController.prototype, "findByRating", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener productos recomendados por id usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna los productos recomendados para el id entregado',
        type: get_producto_dto_1.GetProductoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Productos recomendados no encontrados',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Identificador del usuario',
        example: 1,
    }),
    (0, common_1.Get)('recomendados/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogoController.prototype, "findRecommended", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener productos por rango de precios' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retorna los productos dentro del rango de precios',
        type: get_producto_dto_1.GetProductoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Rangos de precios no válidos',
    }),
    (0, common_1.Get)('filtro-precio'),
    __param(0, (0, common_1.Query)('minPrice')),
    __param(1, (0, common_1.Query)('maxPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CatalogoController.prototype, "filterbyPrice", null);
exports.CatalogoController = CatalogoController = __decorate([
    (0, swagger_1.ApiTags)('Catálogo'),
    (0, common_1.Controller)('catalogo'),
    __metadata("design:paramtypes", [catalogo_service_1.CatalogoService])
], CatalogoController);
//# sourceMappingURL=catalogo.controller.js.map