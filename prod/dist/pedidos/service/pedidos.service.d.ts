import { OutputPedidoDto } from '../dto/output-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
export declare class PedidosService {
  create(): {
    mensaje: string;
  };
  findAll(): OutputPedidoDto[];
  findOne(id: number): OutputPedidoDto;
  update(
    id: number,
    updatePedidoDto: UpdatePedidoDto,
  ): {
    mensaje: string;
  };
}
