import { DeleteResultDto } from './delete-result.dto';
import { GetPedidoDto } from './get-pedido.dto';
export class DeletePedidoResponseDto {
  deleteResult: DeleteResultDto;
  pedido: GetPedidoDto;
}
