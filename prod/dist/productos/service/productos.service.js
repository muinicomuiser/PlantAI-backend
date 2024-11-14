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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("../entities/producto.entity");
const typeorm_2 = require("typeorm");
const entity_to_dto_producto_1 = require("../mapper/entity-to-dto-producto");
const producto_relaciones_1 = require("../shared/constants/producto-relaciones");
const ent_to_dto_aux_1 = require("../mapper/ent-to-dto-aux");
const carro_producto_entity_1 = require("../../carro-compras/entities/carro_producto.entity");
const planta_entity_1 = require("../entities/plantas/planta.entity");
const macetero_entity_1 = require("../entities/maceteros/macetero.entity");
const insumo_entity_1 = require("../entities/insumos/insumo.entity");
const accesorio_entity_1 = require("../entities/accesorios/accesorio.entity");
let ProductosService = class ProductosService {
    constructor(productoRepository, carroProductoRepository) {
        this.productoRepository = productoRepository;
        this.carroProductoRepository = carroProductoRepository;
    }
    async getById(id) {
        const producto = await this.productoRepository.findOne({
            where: { id: id },
            relations: producto_relaciones_1.PRODUCTO_RELATIONS,
        });
        if (!producto) {
            throw new common_1.NotFoundException('No existe un producto con ese id.');
        }
        return entity_to_dto_producto_1.ProductoMapper.entityToDto(producto);
    }
    getByFilters() {
        return { mensaje: 'endpoint en desarrollo' };
    }
    async getAll() {
        const productos = await this.productoRepository.find({
            relations: producto_relaciones_1.PRODUCTO_RELATIONS,
        });
        return productos.map((producto) => entity_to_dto_producto_1.ProductoMapper.entityToDto(producto));
    }
    async create(createProductoDto) {
        const newProducto = await this.productoRepository.save(createProductoDto);
        return ent_to_dto_aux_1.ProductoMapperAux.entityToDtoAux(newProducto);
    }
    async update(id, updateProductoDto) {
        await this.productoRepository.update(id, updateProductoDto);
        return this.getById(id);
    }
    async deleteOne(idProducto) {
        const carroProductosEncontrados = await this.carroProductoRepository.find({
            where: {
                idProducto: idProducto
            }
        });
        const eliminados = await this.carroProductoRepository.remove(carroProductosEncontrados);
        const productoEncontrado = await this.productoRepository.findOne({
            where: {
                id: idProducto
            },
            relations: [...producto_relaciones_1.PRODUCTO_RELATIONS]
        });
        productoEncontrado.etiquetas = [];
        if (productoEncontrado.planta) {
            await this.productoRepository.manager.getRepository(planta_entity_1.Planta).remove(productoEncontrado.planta);
        }
        if (productoEncontrado.accesorio) {
            await this.productoRepository.manager.getRepository(accesorio_entity_1.Accesorio).remove(productoEncontrado.accesorio);
        }
        if (productoEncontrado.insumo) {
            await this.productoRepository.manager.getRepository(insumo_entity_1.Insumo).remove(productoEncontrado.insumo);
        }
        if (productoEncontrado.macetero) {
            await this.productoRepository.manager.getRepository(macetero_entity_1.Macetero).remove(productoEncontrado.macetero);
        }
        return await this.productoRepository.remove(productoEncontrado);
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(carro_producto_entity_1.CarroProducto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductosService);
//# sourceMappingURL=productos.service.js.map