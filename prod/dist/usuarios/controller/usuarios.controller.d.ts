import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UsuariosService } from '../service/usuarios.service';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    findAll(): Promise<OutputUserDTO[]>;
    findById(id: number): Promise<OutputUserDTO>;
    create(createUsuarioDTO: CreateUsuarioDto): Promise<OutputUserDTO>;
    updateOne(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<OutputUserDTO>;
    deleteOne(id: number): Promise<{
        message: string;
    }>;
    addPedido(pedido: CreatePedidoDto, idUsuario: number): string;
    findPedidos(idUsuario: number): string;
    updateMedioPago(idUsuario: number, medioPago: string): string;
}
