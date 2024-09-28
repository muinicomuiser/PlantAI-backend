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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.EquipoController = void 0;
const common_1 = require('@nestjs/common');
const equipo_service_1 = require('./equipo.service');
const swagger_1 = require('@nestjs/swagger');
let EquipoController = class EquipoController {
  constructor(equipoService) {
    this.equipoService = equipoService;
  }
  obtenerEquipo(response) {
    const equipo = this.equipoService.obtenerEquipo();
    response.status(200).send(equipo);
  }
  obtenerEquipoPorArea(area, response) {
    const areaObtenida = this.equipoService.obtenerEquipoPorArea(area);
    if (areaObtenida) {
      response.status(200).send(areaObtenida);
    } else {
      response.status(404).send('No existe un área con ese nombre.');
    }
  }
  obtenerAreas() {
    return this.equipoService.obtenerAreas();
  }
  obtenerInformacionGeneral() {
    return this.equipoService.obtenerInformacionGeneral();
  }
};
exports.EquipoController = EquipoController;
__decorate(
  [
    (0, swagger_1.ApiOperation)({
      summary: 'Obtener toda la información del equipo',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  EquipoController.prototype,
  'obtenerEquipo',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Obtener área por nombre' }),
    (0, swagger_1.ApiResponse)({
      status: 200,
      description: 'Devuelve información del área',
    }),
    (0, swagger_1.ApiResponse)({
      status: 404,
      description: 'No existe un area con ese nombre',
    }),
    (0, common_1.Get)('area/:area'),
    __param(0, (0, common_1.Param)('area')),
    __param(1, (0, common_1.Res)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', void 0),
  ],
  EquipoController.prototype,
  'obtenerEquipoPorArea',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las áreas' }),
    (0, common_1.Get)('area'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  EquipoController.prototype,
  'obtenerAreas',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({
      summary: 'Obtener información del ecommerce',
    }),
    (0, common_1.Get)('plantai'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  EquipoController.prototype,
  'obtenerInformacionGeneral',
  null,
);
exports.EquipoController = EquipoController = __decorate(
  [
    (0, swagger_1.ApiTags)('Equipo'),
    (0, common_1.Controller)('equipo'),
    __metadata('design:paramtypes', [equipo_service_1.EquipoService]),
  ],
  EquipoController,
);
//# sourceMappingURL=equipo.controller.js.map
