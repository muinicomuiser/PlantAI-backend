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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../service/usuarios.service");
const update_usuario_dto_1 = require("../dto/update-usuario.dto");
const create_usuario_dto_1 = require("../dto/create-usuario.dto");
const swagger_1 = require("@nestjs/swagger");
const output_userDTO_1 = require("../dto/output-userDTO");
const output_pedido_dto_1 = require("../../pedidos/dto/output-pedido.dto");
const update_carro_compra_dto_1 = require("../../carro-compras/dto/update-carro-compra.dto");
const create_pedido_dto_1 = require("../../pedidos/dto/create-pedido.dto");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    findAll() {
        return this.usuariosService.findAll();
    }
    findOne(id) {
        return this.usuariosService.findOne(id);
    }
    createUser(usuario) {
        return this.usuariosService.createUser(usuario);
    }
    updateOne(id, usuario) {
        return this.usuariosService.updateOne(id, usuario);
    }
    deleteOne(id) {
        return this.usuariosService.deleteOne(id);
    }
    updateCarro(idUsuario, carro) {
        return this.usuariosService.updateCarro(idUsuario, carro);
    }
    addPedido(pedido, idUsuario) {
        return this.usuariosService.addPedido(idUsuario, pedido);
    }
    findPedidos(idUsuario) {
        return this.usuariosService.findPedidos(idUsuario);
    }
    updateMedioPago(idUsuario, medioPago) {
        return this.usuariosService.updateMedioPago(idUsuario, medioPago);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene los Usuarios' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Devuelve todos los usuarios',
        type: output_userDTO_1.OutputUserDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No hay usuarios registrados',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un Usuario según ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario encontrado',
        type: output_userDTO_1.OutputUserDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No hay un usuario con ese id',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crea un usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario creado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Error al crear usuario',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario actualizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'No se ha podido actualizar el usuario',
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "updateOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un usuario según su id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario eliminado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No existe un usuario con ese id',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "deleteOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza el carro de un usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Carro actualizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Error al actualizar el carro',
    }),
    (0, common_1.Patch)('updateCarro/:idUsuario/'),
    __param(0, (0, common_1.Param)('idUsuario')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_carro_compra_dto_1.UpdateCarroCompraDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "updateCarro", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Agrega un pedido a un usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pedido añadido',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Error al añadir el pedido',
    }),
    (0, common_1.Post)('addPedido/:idUsuario'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pedido_dto_1.CreatePedidoDto, Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "addPedido", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene los pedidos realizados según usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Devuelve la lista de pedidos de un usuario',
        type: output_pedido_dto_1.OutputPedidoDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Error al buscar los pedidos',
    }),
    (0, common_1.Get)('pedidos/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findPedidos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Modifica el medio de pago de un usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Medio de pago modificado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Error al modificar el medio de pago',
    }),
    (0, swagger_1.ApiQuery)({ name: 'Tipo de Pago' }),
    (0, common_1.Patch)('updateMedioPago/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "updateMedioPago", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map