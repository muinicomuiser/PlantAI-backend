import { GetPedidoDto } from '../dto/get-pedido.dto';
import { Pedido } from '../entities/pedido.entity';

export class mapperPedido {
  static toDto(pedido: Pedido): GetPedidoDto {
    const pedidoDto = new GetPedidoDto();
    pedidoDto.id = pedido.id;
    pedidoDto.idUsuario = pedido.idUsuario;
    pedidoDto.fechaCreacion = pedido.fechaCreacion;
    pedidoDto.idMedioPago = pedido.idMedioPago;
    pedidoDto.idEstado = pedido.idEstado;
    pedidoDto.idTipoDespacho = pedido.idTipoDespacho;
    pedidoDto.idCarro = pedido.idCarro;
    pedidoDto.fechaEntrega = pedido.fechaEntrega;
    pedidoDto.usuario = pedido?.usuario;
    pedidoDto.medioPago = pedido?.medioPago;
    pedidoDto.estadoPedido = pedido?.estadoPedido;
    pedidoDto.tipoDespacho = pedido?.tipoDespacho;
    pedidoDto.carro = pedido?.carro;
    pedidoDto.Pago = pedido?.Pago;
    return pedidoDto;
  }
}
