"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapperPedido = void 0;
const get_pedido_dto_1 = require("../dto/get-pedido.dto");
class mapperPedido {
    static toDto(pedido) {
        const pedidoDto = new get_pedido_dto_1.GetPedidoDto();
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
exports.mapperPedido = mapperPedido;
//# sourceMappingURL=pedido.mapper.js.map