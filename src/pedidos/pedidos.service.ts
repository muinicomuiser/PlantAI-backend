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
        return Pedido;
    }
    //entrega todos los pedidos
    findAll() {
        return [];
    }
    //entrega pedidos por id
    findOne(id: number) {
        return Pedido;
    }

    //modificar un pedido
    update(id: number, updatePedidoDto: UpdatePedidoDto) {
        return Pedido;
    }
}
