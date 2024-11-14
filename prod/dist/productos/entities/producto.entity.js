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
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./categoria.entity");
const etiqueta_entity_1 = require("./etiqueta.entity");
const planta_entity_1 = require("./plantas/planta.entity");
const macetero_entity_1 = require("./maceteros/macetero.entity");
const accesorio_entity_1 = require("./accesorios/accesorio.entity");
const insumo_entity_1 = require("./insumos/insumo.entity");
let Producto = class Producto {
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Producto.prototype, "SKU", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_categoria' }),
    __metadata("design:type", Number)
], Producto.prototype, "idCategoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Producto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Producto.prototype, "imagen", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unidades_vendidas' }),
    __metadata("design:type", Number)
], Producto.prototype, "unidadesVendidas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "puntuacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "ancho", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "alto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "largo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria),
    (0, typeorm_1.JoinColumn)({ name: 'id_categoria' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => etiqueta_entity_1.Etiqueta, (etiqueta) => etiqueta.productos),
    (0, typeorm_1.JoinTable)({
        name: 'productos_etiquetas',
        joinColumn: { name: 'id_producto', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_etiqueta', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Producto.prototype, "etiquetas", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => planta_entity_1.Planta, (planta) => planta.producto),
    __metadata("design:type", planta_entity_1.Planta)
], Producto.prototype, "planta", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => macetero_entity_1.Macetero, (macetero) => macetero.producto),
    __metadata("design:type", macetero_entity_1.Macetero)
], Producto.prototype, "macetero", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => accesorio_entity_1.Accesorio, (accesorio) => accesorio.producto),
    __metadata("design:type", accesorio_entity_1.Accesorio)
], Producto.prototype, "accesorio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => insumo_entity_1.Insumo, (insumo) => insumo.producto),
    __metadata("design:type", insumo_entity_1.Insumo)
], Producto.prototype, "insumo", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)({ name: 'productos' })
], Producto);
//# sourceMappingURL=producto.entity.js.map