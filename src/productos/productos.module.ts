import { Module } from '@nestjs/common';
import { ProductosController } from './controller/productos.controller';
import { ProductosService } from './service/productos.service';
import { CatalogoController } from './controller/catalogo.controller';
import { CatalogoService } from './service/catalogo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from './entities/categoria.entity';
import { Planta } from './entities/plantas/planta.entity';
import { Macetero } from './entities/maceteros/macetero.entity';
import { Accesorio } from './entities/accesorios/accesorio.entity';
import { Insumo } from './entities/insumos/insumo.entity';
import { Especie } from './entities/plantas/especie.entity';

import { Fotoperiodo } from './entities/plantas/fotoperiodo.entity';
import { HabitoCrecimiento } from './entities/plantas/habito_crecimiento.entity';
import { TipoRiego } from './entities/plantas/tipo_riego.entity';
import { TipoAccesorio } from './entities/accesorios/tipo_accesorio.entity';
import { TipoInsumo } from './entities/insumos/tipo_insumo.entity';
import { TipoMacetero } from './entities/maceteros/tipo_macetero.entity';
import { Marca } from 'src/commons/entities/marca.entity';
import { ColorProducto } from 'src/commons/entities/color.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Categoria,
      Planta,
      Macetero,
      Accesorio,
      Insumo,
      Especie,
      Fotoperiodo,
      HabitoCrecimiento,
      TipoRiego,
      TipoAccesorio,
      TipoInsumo,
      TipoMacetero,
      Marca,
      ColorProducto,
    ]),
  ],
  controllers: [ProductosController, CatalogoController],
  providers: [ProductosService, CatalogoService],
  exports: [ProductosService],
})
export class ProductosModule {}
