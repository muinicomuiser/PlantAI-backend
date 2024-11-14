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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tipo_usuario_entity_1 = require("../entities/tipo_usuario.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
const entitty_to_dto_usuarios_1 = require("../mapper/entitty-to-dto-usuarios");
let UsuariosService = class UsuariosService {
    constructor(usuariosRepository, tipoUsuarioRepository) {
        this.usuariosRepository = usuariosRepository;
        this.tipoUsuarioRepository = tipoUsuarioRepository;
    }
    async findAll() {
        const usuarios = await this.usuariosRepository.find({
            relations: [
                'tipoUsuario',
                'direccion',
                'usuarioMedioPago',
                'carros',
                'pedidos',
            ],
        });
        return usuarios.map(entitty_to_dto_usuarios_1.toOutputUserDTO);
    }
    async findById(id) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id },
            relations: [
                'tipoUsuario',
                'direccion',
                'usuarioMedioPago',
                'carros',
                'pedidos',
            ],
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return (0, entitty_to_dto_usuarios_1.toOutputUserDTO)(usuario);
    }
    async createUser(createUsuarioDto) {
        const tipoUsuario = await this.tipoUsuarioRepository.findOne({
            where: { id: createUsuarioDto.tipoUsuarioId },
        });
        if (!tipoUsuario) {
            throw new common_1.NotFoundException(`TipoUsuario con ID ${createUsuarioDto.tipoUsuarioId} no existe`);
        }
        const usuario = this.usuariosRepository.create({
            ...createUsuarioDto,
            tipoUsuario,
        });
        const usuarioCreado = await this.usuariosRepository.save(usuario);
        return (0, entitty_to_dto_usuarios_1.toOutputUserDTO)(usuarioCreado);
    }
    async updateOne(id, UpdateUsuarioDto) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id },
            relations: [
                'tipoUsuario',
                'direccion',
                'usuarioMedioPago',
                'carros',
                'pedidos',
            ],
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        if (UpdateUsuarioDto.tipoUsuarioId) {
            const tipoUsuario = await this.tipoUsuarioRepository.findOne({
                where: { id: UpdateUsuarioDto.tipoUsuarioId },
            });
            if (!tipoUsuario) {
                throw new common_1.NotFoundException(`Tipo Usuario con ID ${UpdateUsuarioDto.tipoUsuarioId} no existe`);
            }
            usuario.tipoUsuario = tipoUsuario;
        }
        this.usuariosRepository.merge(usuario, UpdateUsuarioDto);
        const usuarioActualizado = await this.usuariosRepository.save(usuario);
        return (0, entitty_to_dto_usuarios_1.toOutputUserDTO)(usuarioActualizado);
    }
    async deleteUser(id) {
        const usuario = await this.usuariosRepository.findOne({
            where: { id },
            relations: { direccion: true },
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        await this.usuariosRepository.softDelete(id);
        return { message: `Usuario con ID ${id} eliminado con éxito` };
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
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(tipo_usuario_entity_1.TipoUsuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map