"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosModule = void 0;
const common_1 = require("@nestjs/common");
const productos_controller_1 = require("./controller/productos.controller");
const productos_service_1 = require("./service/productos.service");
const catalogo_controller_1 = require("./controller/catalogo.controller");
const catalogo_service_1 = require("./service/catalogo.service");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("./entities/producto.entity");
const categoria_entity_1 = require("./entities/categoria.entity");
const planta_entity_1 = require("./entities/plantas/planta.entity");
const macetero_entity_1 = require("./entities/maceteros/macetero.entity");
const accesorio_entity_1 = require("./entities/accesorios/accesorio.entity");
const insumo_entity_1 = require("./entities/insumos/insumo.entity");
const especie_entity_1 = require("./entities/plantas/especie.entity");
const fotoperiodo_entity_1 = require("./entities/plantas/fotoperiodo.entity");
const habito_crecimiento_entity_1 = require("./entities/plantas/habito_crecimiento.entity");
const tipo_riego_entity_1 = require("./entities/plantas/tipo_riego.entity");
const tipo_accesorio_entity_1 = require("./entities/accesorios/tipo_accesorio.entity");
const tipo_insumo_entity_1 = require("./entities/insumos/tipo_insumo.entity");
const tipo_macetero_entity_1 = require("./entities/maceteros/tipo_macetero.entity");
const marca_entity_1 = require("../commons/entities/marca.entity");
const color_entity_1 = require("../commons/entities/color.entity");
let ProductosModule = class ProductosModule {
};
exports.ProductosModule = ProductosModule;
exports.ProductosModule = ProductosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                producto_entity_1.Producto,
                categoria_entity_1.Categoria,
                planta_entity_1.Planta,
                macetero_entity_1.Macetero,
                accesorio_entity_1.Accesorio,
                insumo_entity_1.Insumo,
                especie_entity_1.Especie,
                fotoperiodo_entity_1.Fotoperiodo,
                habito_crecimiento_entity_1.HabitoCrecimiento,
                tipo_riego_entity_1.TipoRiego,
                tipo_accesorio_entity_1.TipoAccesorio,
                tipo_insumo_entity_1.TipoInsumo,
                tipo_macetero_entity_1.TipoMacetero,
                marca_entity_1.Marca,
                color_entity_1.ColorProducto,
            ]),
        ],
        controllers: [productos_controller_1.ProductosController, catalogo_controller_1.CatalogoController],
        providers: [productos_service_1.ProductosService, catalogo_service_1.CatalogoService],
        exports: [productos_service_1.ProductosService],
    })
], ProductosModule);
//# sourceMappingURL=productos.module.js.map