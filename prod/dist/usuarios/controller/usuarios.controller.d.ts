import { UsuariosService } from '../service/usuarios.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { tipoPago } from 'src/pedidos/entities/pago.enum';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    findAll(): OutputUserDTO[];
    findOne(id: number): OutputUserDTO;
    createUser(usuario: CreateUsuarioDto): CreateUsuarioDto;
    updateOne(id: number, usuario: UpdateUsuarioDto): string;
    deleteOne(id: number): import("../entities/usuario.entity").Usuario[];
    updateCarro(idUsuario: number, carro: UpdateCarroCompraDto): UpdateCarroCompraDto;
    addPedido(pedido: CreatePedidoDto, idUsuario: number): string;
    findPedidos(idUsuario: number): string;
    updateMedioPago(idUsuario: number, medioPago: tipoPago): string;
}
