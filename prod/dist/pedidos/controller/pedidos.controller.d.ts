import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { PedidosService } from '../service/pedidos.service';
import { DeletePedidoResponseDto } from '../dto/delete-pedido.dto';
export declare class PedidosController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosService);
    create(createPedidoDTO: CreatePedidoDto): Promise<GetPedidoDto>;
    findAll(estado: string): Promise<GetPedidoDto[]>;
    findOne(id: number): Promise<GetPedidoDto>;
    update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<GetPedidoDto>;
    remove(id: number): Promise<DeletePedidoResponseDto>;
}
