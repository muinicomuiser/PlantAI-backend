import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { DeleteResultDto } from '../dto/delete-result.dto';
export declare class PedidosService {
    private pedidoRepository;
    constructor(pedidoRepository: Repository<Pedido>);
    create(createPedidoDto: CreatePedidoDto): Promise<GetPedidoDto>;
    findAll(): Promise<GetPedidoDto[]>;
    findOne(id: number): Promise<GetPedidoDto>;
    update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<GetPedidoDto>;
    remove(id: number): Promise<{
        deleteResult: DeleteResultDto;
        pedido: GetPedidoDto;
    }>;
}
