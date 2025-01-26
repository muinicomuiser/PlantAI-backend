import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { TipoDescuento } from './entities/tipo_descuento.entity';
import { TipoPromocion } from './entities/tipo_promocion.entity';
import { TipoSeleccionProducto } from './entities/tipo_seleccion_producto.entity';
import { PromocionesProductosService } from './service/promociones-productos.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Promocion,
    TipoPromocion,
    TipoSeleccionProducto,
    TipoDescuento,
  ])
  ],
  providers: [PromocionesProductosService],
  exports: [PromocionesProductosService]
})
export class PromocionesProductosModule { }
