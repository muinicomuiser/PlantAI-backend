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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("../entities/usuario.entity");
const carro_compra_entity_1 = require("../../carro-compras/entities/carro-compra.entity");
const output_userDTO_1 = require("../dto/output-userDTO");
let UsuariosService = class UsuariosService {
    constructor() {
        this.users = [];
        this.usersDTO = [];
        this.pedidos = [];
        this.users.push(new usuario_entity_1.Usuario(1, 'User1', '1234', 'user1@gmail.com', new carro_compra_entity_1.CarroCompra(1, 1, [], 0), undefined));
        this.usersDTO.push(new output_userDTO_1.OutputUserDTO(this.users[0].username, this.users[0].email, this.users[0].carrito, this.users[0].pedidos));
    }
    findAll() {
        return this.usersDTO;
    }
    findOne(id) {
        return this.usersDTO[id - 1];
    }
    createUser(usuario) {
        return usuario;
    }
    updateOne(id, usuario) {
        return 'Usuario actualizado';
    }
    deleteOne(id) {
        return this.users.splice(id - 1, 1);
    }
    updateCarro(idUsuario, carro) {
        return carro;
    }
    findPedidos(idUsuario) {
        return 'Retorna los pedidos del usuario según el ID';
    }
    addPedido(idUsuario, pedido) {
        return 'Agrega un pedido a un usuario';
    }
    updateMedioPago(idUsuario, medioPago) {
        return 'Actualiza el Medio de Pago de un usuario';
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map