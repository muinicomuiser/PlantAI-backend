import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  pedidos: Pedido[] = [];

  //servicio Crear Pedido
  create() {
    let pedido: Pedido = new Pedido();
    return this.pedidos;
  }
  //entrega todos los pedidos
  findAll() {
    return this.pedidos;
  }
  //entrega pedidos por id
  findOne(id: number) {
    return this.pedidos;
  }

  //modificar un pedido
  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidos;
  }
}
