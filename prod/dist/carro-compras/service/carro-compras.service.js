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
exports.CarroComprasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const carro_entity_1 = require("../entities/carro.entity");
const typeorm_2 = require("typeorm");
const carro_compras_mapper_1 = require("../mapper/carro-compras.mapper");
const carro_relaciones_1 = require("../shared/constants/carro-relaciones");
const producto_entity_1 = require("../../productos/entities/producto.entity");
const carro_producto_entity_1 = require("../entities/carro_producto.entity");
let CarroComprasService = class CarroComprasService {
    constructor(carroComprasRepository, productoRepository, carroProductoRepository) {
        this.carroComprasRepository = carroComprasRepository;
        this.productoRepository = productoRepository;
        this.carroProductoRepository = carroProductoRepository;
    }
    async createCarro(idUsuario) {
        const nuevoCarro = new carro_entity_1.CarroCompra(idUsuario);
        const carroGuardado = await this.carroComprasRepository.save(nuevoCarro);
        return true;
    }
    async findByCarroId(id) {
        const carroEncontrado = await this.carroComprasRepository.findOne({
            where: {
                id: id,
            },
            relations: ['carroProductos', ...carro_relaciones_1.CARRO_RELATIONS],
        });
        return carro_compras_mapper_1.CarroComprasMapper.carroEntityToDto(carroEncontrado);
    }
    async findByUserId(id) {
        const carroEncontrado = await this.carroComprasRepository.findOne({
            where: {
                idUsuario: id,
                fecha_cierre: (0, typeorm_2.IsNull)(),
            },
            relations: ['carroProductos', ...carro_relaciones_1.CARRO_RELATIONS],
        });
        if (!carroEncontrado) {
            throw new common_1.NotFoundException('No existe un carro activo para este usuario.');
        }
        return carro_compras_mapper_1.CarroComprasMapper.carroEntityToDto(carroEncontrado);
    }
    async addProductToCarro(idCarro, addProductDto) {
        const stockProducto = await this.productoRepository.findOne({
            where: {
                id: addProductDto.productoId
            }
        });
        if (!stockProducto || stockProducto.cantidad < addProductDto.cantidadProducto) {
            throw new common_1.BadRequestException('Stock insuficiente');
        }
        let carroProducto = await this.carroProductoRepository.findOne({
            where: {
                idCarro: idCarro,
                idProducto: addProductDto.productoId
            },
            relations: [...carro_relaciones_1.CARRO_PRODUCTOS_RELATIONS],
        });
        if (carroProducto) {
            carroProducto.cantidadProducto += addProductDto.cantidadProducto;
        }
        else {
            carroProducto = this.carroProductoRepository.create({
                idCarro: idCarro,
                idProducto: addProductDto.productoId,
                cantidadProducto: addProductDto.cantidadProducto,
            });
        }
        ;
        let carroProductGuardado = await this.carroProductoRepository.save(carroProducto);
        return carro_compras_mapper_1.CarroComprasMapper.carroProductoEntityToDto(carroProductGuardado);
    }
    async updateProductQuantity(idCarro, updateDto) {
        const carroProducto = await this.carroProductoRepository.findOne({
            where: {
                idCarro: idCarro,
                idProducto: updateDto.productoId,
            }
        });
        if (!carroProducto) {
            throw new common_1.NotFoundException('Producto no encontrado en el carro');
        }
        ;
        const stockProducto = await this.productoRepository.findOne({
            where: {
                id: updateDto.productoId
            }
        });
        if (!stockProducto || stockProducto.cantidad < updateDto.cantidadProducto) {
            throw new common_1.BadRequestException('Stock insuficiente');
        }
        carroProducto.cantidadProducto = updateDto.cantidadProducto;
        await this.carroProductoRepository.save(carroProducto);
        return updateDto;
    }
    async removeProductCarro(idCarro, idProducto) {
        const carroProducto = await this.carroProductoRepository.findOne({
            where: {
                idCarro: idCarro,
                idProducto: idProducto,
            }
        });
        if (!carroProducto) {
            throw new common_1.NotFoundException('Producto no encontrado en carrito');
        }
        ;
        await this.carroProductoRepository.remove(carroProducto);
        return true;
    }
    async deleteCarro(idCarro) {
        const carroProducto = await this.carroProductoRepository.find({
            where: {
                idCarro: idCarro
            }
        });
        await this.carroProductoRepository.remove(carroProducto);
        const carroEncontrado = await this.carroComprasRepository.findOne({
            where: {
                id: idCarro
            }
        });
        await this.carroComprasRepository.remove(carroEncontrado);
        return true;
    }
};
exports.CarroComprasService = CarroComprasService;
exports.CarroComprasService = CarroComprasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carro_entity_1.CarroCompra)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(2, (0, typeorm_1.InjectRepository)(carro_producto_entity_1.CarroProducto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CarroComprasService);
//# sourceMappingURL=carro-compras.service.js.map