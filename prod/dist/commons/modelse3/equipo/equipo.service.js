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
exports.EquipoService = void 0;
const common_1 = require('@nestjs/common');
const area_1 = require('../area');
const integrante_1 = require('../integrante');
const equipo_1 = require('../equipo');
const ecommerce_1 = require('../ecommerce');
let nicoLavanderos = new integrante_1.Integrante('Nicolás Lavanderos', 'UX/UI');
let danielAlfaro = new integrante_1.Integrante('Daniel Alfaro', 'UX/UI');
let vicenteDonoso = new integrante_1.Integrante('Vicente Donoso', 'UX/UI');
let makaGarabito = new integrante_1.Integrante('Makarena Garabito', 'UX/UI');
let jorgeSilva = new integrante_1.Integrante('Jorge Silva', 'UX/UI');
let estefaniaPerez = new integrante_1.Integrante('Estefanía Pérez', 'Frontend');
let nicoleVargas = new integrante_1.Integrante('Nicole Vargas', 'Frontend');
let karlaAcuna = new integrante_1.Integrante('Karla Acuña', 'Frontend');
let nicoDonoso = new integrante_1.Integrante('Nicolás Donoso', 'Backend');
let borisSuazo = new integrante_1.Integrante('Boris Suazo', 'Backend');
let nicoFernandez = new integrante_1.Integrante('Nicolás Fernandez', 'Backend');
let lucianoVillagran = new integrante_1.Integrante(
  'Luciano Villagrán',
  'Backend',
);
let vicenteLabbe = new integrante_1.Integrante('Vicente Labbé', 'Mobile');
let cesarSandoval = new integrante_1.Integrante('Cesar Sandoval', 'Mobile');
let uxui = new area_1.Area('UXUI', nicoLavanderos, [
  nicoLavanderos,
  danielAlfaro,
  vicenteDonoso,
  makaGarabito,
  jorgeSilva,
]);
let frontend = new area_1.Area('Frontend', estefaniaPerez, [
  estefaniaPerez,
  nicoleVargas,
  karlaAcuna,
]);
let backend = new area_1.Area('Backend', nicoDonoso, [
  nicoDonoso,
  borisSuazo,
  nicoFernandez,
  lucianoVillagran,
]);
let mobile = new area_1.Area('Mobile', vicenteLabbe, [
  vicenteLabbe,
  cesarSandoval,
]);
let EquipoService = class EquipoService {
  constructor() {
    this.areas = [];
    this.equipo = new equipo_1.Equipo('Cotiledón', borisSuazo, nicoLavanderos, [
      uxui,
      frontend,
      backend,
      mobile,
    ]);
    this.areas.push(uxui, frontend, backend, mobile);
  }
  obtenerEquipo() {
    return this.equipo;
  }
  obtenerEquipoPorArea(area) {
    for (let i of this.areas) {
      if (i.nombre.toLocaleLowerCase() == area.toLocaleLowerCase()) {
        return i;
      }
    }
    return null;
  }
  obtenerAreas() {
    return this.areas;
  }
  obtenerInformacionGeneral() {
    const infoEcommerce = new ecommerce_1.ECommerce(
      'PlantAI',
      'Un E-commerce integrado con IA y AR para conectar a clientes con la naturaleza a través de recomendaciones personalizadas ',
      'B2C (Business 2 Client)',
      'Crear un e-commerce tipo Marketplace B2C para la venta de plantas y productos relacionados con la botánica, implementando un sistema de recomendación basado en IA y visualización en VR, que proporcione una experiencia de compra y venta fluida, intuitiva y accesible. Se propone una plataforma de navegación sencilla, buscando maximizar tanto la cantidad de viveros que publiquen en la plataforma, como las transacciones realizadas y la fidelización.',
      `- Desarrollar una plataforma accesible y fácil de usar.
        - Ampliar la oferta de plantas y productos relacionados.
    - Optimizar los procesos de Compra y Venta.
    - Promover la fidelización de usuarios.
    - Brindar soporte y asistencia al cliente.`,
    );
    return infoEcommerce;
  }
};
exports.EquipoService = EquipoService;
exports.EquipoService = EquipoService = __decorate(
  [(0, common_1.Injectable)(), __metadata('design:paramtypes', [])],
  EquipoService,
);
//# sourceMappingURL=equipo.service.js.map
