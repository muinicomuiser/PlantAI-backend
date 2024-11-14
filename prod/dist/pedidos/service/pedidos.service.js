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
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../entities/pedido.entity");
const typeorm_2 = require("@nestjs/typeorm");
const pedidos_constants_1 = require("../shared/constants/pedidos.constants");
const pedido_mapper_1 = require("../mapper/pedido.mapper");
let PedidosService = class PedidosService {
    constructor(pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }
    async create(createPedidoDto) {
        const newPedido = await this.pedidoRepository.save(createPedidoDto);
        return pedido_mapper_1.mapperPedido.toDto(newPedido);
    }
    async findAll() {
        const pedidos = await this.pedidoRepository.find({
            relations: pedidos_constants_1.PEDIDOS_RELATIONS,
        });
        return pedidos.map((pedido) => pedido_mapper_1.mapperPedido.toDto(pedido));
    }
    async findOne(id) {
        const pedido = await this.pedidoRepository.findOne({
            where: { id: id },
            relations: pedidos_constants_1.PEDIDOS_RELATIONS,
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        return pedido_mapper_1.mapperPedido.toDto(pedido);
    }
    async update(id, updatePedidoDto) {
        const updatePedido = await this.pedidoRepository.update(id, updatePedidoDto);
        if (updatePedido.affected === 0) {
            throw new common_1.NotFoundException(`Pedido con id ${id} no encontrado`);
        }
        return await this.findOne(id);
    }
    async remove(id) {
        const pedido = await this.findOne(id);
        const deleteResult = await this.pedidoRepository.delete(id);
        return { deleteResult, pedido };
    }
};
exports.PedidosService = PedidosService;
exports.PedidosService = PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(pedido_entity_1.Pedido)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PedidosService);
//# sourceMappingURL=pedidos.service.js.map