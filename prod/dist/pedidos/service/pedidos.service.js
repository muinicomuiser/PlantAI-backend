'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PedidosService = void 0;
const common_1 = require('@nestjs/common');
const carro_compra_entity_1 = require('../../carro-compras/entities/carro-compra.entity');
const pago_enum_1 = require('../entities/pago.enum');
const despacho_enum_1 = require('../entities/despacho.enum');
const estado_enum_1 = require('../entities/estado.enum');
const output_pedido_dto_1 = require('../dto/output-pedido.dto');
const PedidoSalidaEjemplo = new output_pedido_dto_1.OutputPedidoDto(
  1,
  estado_enum_1.estadoPedido.PAGADO,
  despacho_enum_1.tipoDespacho.RETIRO,
  pago_enum_1.tipoPago.MERCADOPAGO,
  new carro_compra_entity_1.CarroCompra(1, 1, [], 0),
);
PedidoSalidaEjemplo.id = 1;
let PedidosService = class PedidosService {
  create() {
    return { mensaje: 'Pedido creado' };
  }
  findAll() {
    return [PedidoSalidaEjemplo];
  }
  findOne(id) {
    return PedidoSalidaEjemplo;
  }
  update(id, updatePedidoDto) {
    return { mensaje: 'Pedido modificado' };
  }
};
exports.PedidosService = PedidosService;
exports.PedidosService = PedidosService = __decorate(
  [(0, common_1.Injectable)()],
  PedidosService,
);
//# sourceMappingURL=pedidos.service.js.map
