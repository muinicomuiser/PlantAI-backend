import { Injectable } from '@nestjs/common';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  create() {
    return { mensaje: 'Pedido creado' };
  }

  /**Retorna todos los pedidos */
  findAll() {
    return null;
  }

  /**Retorna un pedido según su id */
  findOne(id: number) {
    return null;
  }

  /**Modifica un pedido según su id */
  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return { mensaje: 'Pedido modificado' };
  }
}
