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
exports.Usuario = void 0;
const pedido_entity_1 = require("../../pedidos/entities/pedido.entity");
const direccion_entity_1 = require("./direccion.entity");
const tipo_usuario_entity_1 = require("./tipo_usuario.entity");
const usuarios_medio_pago_entity_1 = require("./usuarios_medio_pago.entity");
const typeorm_1 = require("typeorm");
const carro_entity_1 = require("../../carro-compras/entities/carro.entity");
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "contrasena", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_usuario' }),
    __metadata("design:type", String)
], Usuario.prototype, "nombreUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "rut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nacimiento' }),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => direccion_entity_1.Direccion, (direccion) => direccion.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_usuario_entity_1.TipoUsuario),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_usuario' }),
    __metadata("design:type", tipo_usuario_entity_1.TipoUsuario)
], Usuario.prototype, "tipoUsuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usuarios_medio_pago_entity_1.UsuarioMedioPago, (usuarioMedioPago) => usuarioMedioPago.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "usuarioMedioPago", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => carro_entity_1.CarroCompra, (carro) => carro.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "carros", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_entity_1.Pedido, (pedido) => pedido.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "pedidos", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'fecha_eliminacion' }),
    __metadata("design:type", Date)
], Usuario.prototype, "deletedAt", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios' })
], Usuario);
//# sourceMappingURL=usuario.entity.js.map