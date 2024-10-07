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
exports.UpdatePedidoDto = void 0;
const swagger_1 = require('@nestjs/swagger');
const despacho_enum_1 = require('../entities/despacho.enum');
const estado_enum_1 = require('../entities/estado.enum');
const pago_enum_1 = require('../entities/pago.enum');
const class_validator_1 = require('class-validator');
const class_transformer_1 = require('class-transformer');
class UpdatePedidoDto {}
exports.UpdatePedidoDto = UpdatePedidoDto;
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(estado_enum_1.estadoPedido, {
      message: 'El estado del pedido es incorrecto',
    }),
    __metadata('design:type', String),
  ],
  UpdatePedidoDto.prototype,
  'estado',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(despacho_enum_1.tipoDespacho, {
      message: 'El tipo de despacho es incorrecto',
    }),
    __metadata('design:type', String),
  ],
  UpdatePedidoDto.prototype,
  'tipoDespacho',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(pago_enum_1.tipoPago, {
      message: 'El tipo de pago es incorrecto',
    }),
    __metadata('design:type', String),
  ],
  UpdatePedidoDto.prototype,
  'tipoPago',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata('design:type', Date),
  ],
  UpdatePedidoDto.prototype,
  'fechaEntrega',
  void 0,
);
//# sourceMappingURL=update-pedido.dto.js.map
