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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Pedido = void 0;
const swagger_1 = require('@nestjs/swagger');
const carro_compra_entity_1 = require('../../carro-compras/entities/carro-compra.entity');
const despacho_enum_1 = require('./despacho.enum');
const estado_enum_1 = require('./estado.enum');
const pago_enum_1 = require('./pago.enum');
const class_validator_1 = require('class-validator');
class Pedido {}
exports.Pedido = Pedido;
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata('design:type', Number),
  ],
  Pedido.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', Number),
  ],
  Pedido.prototype,
  'idUsuario',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    __metadata('design:type', Date),
  ],
  Pedido.prototype,
  'fechaCreacion',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(estado_enum_1.estadoPedido),
    __metadata('design:type', String),
  ],
  Pedido.prototype,
  'estado',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(despacho_enum_1.tipoDespacho),
    __metadata('design:type', String),
  ],
  Pedido.prototype,
  'tipoDespacho',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(pago_enum_1.tipoPago),
    __metadata('design:type', String),
  ],
  Pedido.prototype,
  'tipoPago',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    __metadata('design:type', carro_compra_entity_1.CarroCompra),
  ],
  Pedido.prototype,
  'carrito',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDate)(),
    __metadata('design:type', Date),
  ],
  Pedido.prototype,
  'fechaEntrega',
  void 0,
);
//# sourceMappingURL=pedido.entity.js.map
