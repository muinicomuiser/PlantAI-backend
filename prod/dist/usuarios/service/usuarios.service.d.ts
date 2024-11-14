import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { OutputUserDTO } from '../dto/output-userDTO';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { TipoUsuario } from '../entities/tipo_usuario.entity';
import { Usuario } from '../entities/usuario.entity';
export declare class UsuariosService {
    private readonly usuariosRepository;
    private readonly tipoUsuarioRepository;
    constructor(usuariosRepository: Repository<Usuario>, tipoUsuarioRepository: Repository<TipoUsuario>);
    findAll(): Promise<OutputUserDTO[]>;
    findById(id: number): Promise<OutputUserDTO>;
    createUser(createUsuarioDto: CreateUsuarioDto): Promise<OutputUserDTO>;
    updateOne(id: number, UpdateUsuarioDto: UpdateUsuarioDto): Promise<OutputUserDTO>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    findPedidos(idUsuario: number): string;
    addPedido(idUsuario: number, pedido: CreatePedidoDto): string;
    updateMedioPago(idUsuario: number, medioPago: string): string;
}
