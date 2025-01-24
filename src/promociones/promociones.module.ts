import { Module } from '@nestjs/common';
import { PromocionesController } from './controller/promociones.controller';
import { PromocionesService } from './service/promociones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { TipoPromocion } from './entities/tipo_promocion.entity';
import { TipoSeleccionProducto } from './entities/tipo_seleccion_producto.entity';
import { TipoDescuento } from './entities/tipo_descuento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Promocion,
    TipoPromocion,
    TipoSeleccionProducto,
    TipoDescuento
  ])
  ],
  controllers: [PromocionesController],
  providers: [PromocionesService]
})
export class PromocionesModule { }
