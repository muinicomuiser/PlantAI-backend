import { GetPedidoDto } from '../dto/get-pedido.dto';
import { Pedido } from '../entities/pedido.entity';
export declare class mapperPedido {
    static toDto(pedido: Pedido): GetPedidoDto;
}
