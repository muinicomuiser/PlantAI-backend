import { ApiProperty } from '@nestjs/swagger';
import { DeleteResultDto } from './delete-result.dto';
import { GetPedidoDto } from './get-pedido.dto';
export class DeletePedidoResponseDto {
  @ApiProperty({ type: DeleteResultDto })
  deleteResult: DeleteResultDto;
  @ApiProperty({ type: GetPedidoDto })
  pedido: GetPedidoDto;
}
