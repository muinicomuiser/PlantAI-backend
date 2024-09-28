import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { estadoPedido } from '../entities/estado.enum';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';
import { OutputPedidoDto } from '../dto/output-pedido.dto';
import { PedidosService } from '../service/pedidos.service';
export declare class PedidosController {
  private readonly pedidosService;
  constructor(pedidosService: PedidosService);
  create(createPedidoDTO: CreatePedidoDto): {
    mensaje: string;
  };
  findAll(estado: estadoPedido): OutputPedidoDto[];
  findOne(id: number): OutputPedidoDto;
  update(
    id: number,
    updatePedidoDto: UpdatePedidoDto,
  ): {
    mensaje: string;
  };
}
