import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { OutputUserDTO } from '../dto/output-userDTO';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { tipoPago } from 'src/pedidos/entities/pago.enum';
import { UpdateCarroCompraDto } from 'src/carro-compras/dto/update-carro-compra.dto';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
export declare class UsuariosService {
  users: Usuario[];
  usersDTO: OutputUserDTO[];
  pedidos: Pedido[];
  constructor();
  findAll(): OutputUserDTO[];
  findOne(id: number): OutputUserDTO;
  createUser(usuario: CreateUsuarioDto): CreateUsuarioDto;
  updateOne(id: number, usuario: UpdateUsuarioDto): string;
  deleteOne(id: number): {
    mensaje: string;
  };
  updateCarro(
    idUsuario: number,
    carro: UpdateCarroCompraDto,
  ): UpdateCarroCompraDto;
  findPedidos(idUsuario: number): string;
  addPedido(idUsuario: number, pedido: CreatePedidoDto): string;
  updateMedioPago(idUsuario: number, medioPago: tipoPago): string;
}
