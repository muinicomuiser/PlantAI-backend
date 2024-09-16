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
exports.ProductoSalidaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const categorias_1 = require("../entities/categorias");
class ProductoSalidaDto {
    constructor(nombre, precio, imagen = '', descripcion = '', cantidad = 0, familia = '', fotoperiodo = undefined, tipoRiego = undefined, petFriendly = false, color = '') {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.unidadesVendidas = 0;
        this.puntuacion = 0;
        this.familia = familia;
        this.fotoperiodo = fotoperiodo;
        this.tipoRiego = tipoRiego;
        this.petFriendly = petFriendly;
        this.color = color;
    }
}
exports.ProductoSalidaDto = ProductoSalidaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Generado automáticamente en el servidor.',
    }),
    __metadata("design:type", Number)
], ProductoSalidaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ciprés',
        description: 'Nombre público del producto.',
    }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Precio de venta.' }),
    __metadata("design:type", Number)
], ProductoSalidaDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'cotiledon.com/imagenes/cipres.jpg',
        description: 'URL de la imagen del producto.',
    }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "imagen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Producto ejemplo. Primera planta de la tienda.',
        description: 'Descripción del producto.',
    }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Número de unidades del producto en stock.',
    }),
    __metadata("design:type", Number)
], ProductoSalidaDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Número de unidades del producto vendidas.',
    }),
    __metadata("design:type", Number)
], ProductoSalidaDto.prototype, "unidadesVendidas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Puntuación en escala numérica que los usuarios le han dado al producto.',
    }),
    __metadata("design:type", Number)
], ProductoSalidaDto.prototype, "puntuacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Conífera',
        description: 'Famila a la que pertenece la planta.',
    }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "familia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: categorias_1.FotoPeriodo.largo,
        description: 'Fotoperíodo óptimo para la planta.',
        enum: categorias_1.FotoPeriodo,
    }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "fotoperiodo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: categorias_1.TipoRiego.regadera,
        description: 'Tipo de riego óptimo para la planta.',
        enum: categorias_1.TipoRiego,
    }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "tipoRiego", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Boolean que describe si la planta es o no es Pet Friendly',
    }),
    __metadata("design:type", Boolean)
], ProductoSalidaDto.prototype, "petFriendly", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'verde', description: 'Color de la planta.' }),
    __metadata("design:type", String)
], ProductoSalidaDto.prototype, "color", void 0);
//# sourceMappingURL=producto-salida.dto.js.map