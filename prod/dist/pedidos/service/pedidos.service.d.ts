import { UpdatePedidoDto } from '../dto/update-pedido.dto';
export declare class PedidosService {
    create(): {
        mensaje: string;
    };
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updatePedidoDto: UpdatePedidoDto): {
        mensaje: string;
    };
}
