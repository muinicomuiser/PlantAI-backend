import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
export declare class UsuariosService {
    constructor();
    findAll(): any;
    findOne(id: number): any;
    createUser(usuario: CreateUsuarioDto): any;
    updateOne(id: number, usuario: UpdateUsuarioDto): string;
    deleteOne(id: number): {
        mensaje: string;
    };
    updateCarro(idUsuario: number, carro: UpdateCarroCompraDto): UpdateCarroCompraDto;
    findPedidos(idUsuario: number): string;
    addPedido(idUsuario: number, pedido: CreatePedidoDto): string;
    updateMedioPago(idUsuario: number, medioPago: string): string;
}
