import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { PedidosService } from '../service/pedidos.service';
export declare class PedidosController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosService);
    create(createPedidoDTO: CreatePedidoDto): {
        mensaje: string;
    };
    findAll(estado: string): any;
    findOne(id: number): any;
    update(id: number, updatePedidoDto: UpdatePedidoDto): {
        mensaje: string;
    };
}
