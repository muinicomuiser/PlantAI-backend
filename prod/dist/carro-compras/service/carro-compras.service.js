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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarroComprasService = void 0;
const common_1 = require("@nestjs/common");
const categorias_1 = require("../../productos/entities/categorias");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let CarroComprasService = class CarroComprasService {
    constructor() {
        this.carrosCompra = [];
        const plantaUno = new producto_entity_1.Producto('Ciprés', 5000, 'cotiledon.com/imagenes/cipres.jpg', 'Producto ejemplo. Primera planta de la tienda', 5, 'Conífera', categorias_1.FotoPeriodo.largo, categorias_1.TipoRiego.regadera, true, 'verde');
        plantaUno.id = 1;
        plantaUno.puntuacion = 5;
        plantaUno.unidadesVendidas = 5;
        const carroCompra = {
            id: 1,
            idUsuario: 1,
            productos: [plantaUno],
            precioTotal: plantaUno.precio,
        };
        this.carrosCompra.push(carroCompra);
    }
    createCarro(carro) {
        return this.carrosCompra[0];
    }
    findByCarroId(id) {
        return this.carrosCompra[0];
    }
    findByUserId(id) {
        return this.carrosCompra[0];
    }
    deleteCarro(id) {
        return true;
    }
    updateCarro(id, carro) {
        return this.carrosCompra[0];
    }
};
exports.CarroComprasService = CarroComprasService;
exports.CarroComprasService = CarroComprasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CarroComprasService);
//# sourceMappingURL=carro-compras.service.js.map