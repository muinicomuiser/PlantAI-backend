"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRiego = void 0;
const typeorm_1 = require("typeorm");
let TipoRiego = class TipoRiego {
};
exports.TipoRiego = TipoRiego;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TipoRiego.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_riego' }),
    __metadata("design:type", String)
], TipoRiego.prototype, "tipoRiego", void 0);
exports.TipoRiego = TipoRiego = __decorate([
    (0, typeorm_1.Entity)({ name: 'plantas_tipo_riego' })
], TipoRiego);
//# sourceMappingURL=tipo_riego.entity.js.map