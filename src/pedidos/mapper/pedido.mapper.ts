import { GetDireccionEnvioDto } from '../dto/get-direccion-envio.dto';
import { GetPedidoDto } from '../dto/get-pedido.dto';
import { GetPedidoUsuarioDto } from '../dto/get-pedido.usuario.dto';
import { GetProductoPedidoDto } from '../dto/get-producto-pedido.dto';
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
    pedidoDto.medioPago = pedido?.medioPago;
    pedidoDto.estadoPedido = pedido?.estadoPedido;
    pedidoDto.tipoDespacho = pedido?.tipoDespacho;
    pedidoDto.Pago = pedido?.Pago;
    // pedidoDto.carro = pedido?.carro;
    // pedidoDto.usuario = pedido?.usuario;

    const productosPedidoDto: GetProductoPedidoDto[] = pedido.productosPedido.map(productoPedido => {
      return Object.assign(new GetProductoPedidoDto(), productoPedido)
    })
    const direccionDto: GetDireccionEnvioDto = Object.assign(new GetDireccionEnvioDto(), pedido.direccionEnvio)
    pedidoDto.productosPedido = productosPedidoDto
    pedidoDto.direccionEnvio = direccionDto
    return pedidoDto;
  }
  static toDtoUsuario(pedido: Pedido): GetPedidoUsuarioDto {
    const pedidoDto = new GetPedidoUsuarioDto();
    pedidoDto.id = pedido.id;
    pedidoDto.idUsuario = pedido.idUsuario;
    pedidoDto.fechaCreacion = pedido.fechaCreacion;
    pedidoDto.nombreMedioPago = pedido.medioPago.nombre;
    pedidoDto.nombreEstadoPedido = pedido.estadoPedido.estado;
    pedidoDto.nombreTipoDespacho = pedido.tipoDespacho.tipo;
    pedidoDto.fechaEntrega = pedido.fechaEntrega;
    pedidoDto.nombreMedioPago = pedido?.medioPago.nombre;
    pedidoDto.receptor = pedido?.receptor
    // pedidoDto.carro = pedido?.carro;
    // pedidoDto.usuario = pedido?.usuario;

    const productosPedidoDto: GetProductoPedidoDto[] = pedido.productosPedido.map(productoPedido => {
      const dto: GetProductoPedidoDto = new GetProductoPedidoDto();
      dto.cantidad = productoPedido.cantidad;
      dto.idProducto = productoPedido.idProducto;
      dto.precioCompraUnidad = productoPedido.precioCompraUnidad;
      return dto
    })
    const direccionDto: GetDireccionEnvioDto = Object.assign(new GetDireccionEnvioDto(), pedido.direccionEnvio)
    pedidoDto.productosPedido = productosPedidoDto
    pedidoDto.direccionEnvio = direccionDto
    return pedidoDto;
  }
}
