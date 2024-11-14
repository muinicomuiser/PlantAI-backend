"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroComprasModule = void 0;
const common_1 = require("@nestjs/common");
const carro_compras_service_1 = require("./service/carro-compras.service");
const carro_compras_controller_1 = require("./controller/carro-compras.controller");
const typeorm_1 = require("@nestjs/typeorm");
const carro_entity_1 = require("./entities/carro.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
const carro_producto_entity_1 = require("./entities/carro_producto.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
let CarroComprasModule = class CarroComprasModule {
};
exports.CarroComprasModule = CarroComprasModule;
exports.CarroComprasModule = CarroComprasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([carro_entity_1.CarroCompra, producto_entity_1.Producto, carro_producto_entity_1.CarroProducto, usuario_entity_1.Usuario]),
        ],
        controllers: [carro_compras_controller_1.CarroComprasController],
        providers: [carro_compras_service_1.CarroComprasService],
    })
], CarroComprasModule);
//# sourceMappingURL=carro-compras.module.js.map