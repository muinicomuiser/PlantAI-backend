import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocionesController } from './controller/promociones.controller';
import { Promocion } from './entities/promocion.entity';
import { TipoDescuento } from './entities/tipo_descuento.entity';
import { TipoPromocion } from './entities/tipo_promocion.entity';
import { TipoSeleccionProducto } from './entities/tipo_seleccion_producto.entity';
import { PromocionesService } from './service/promociones.service';
import { ProductosModule } from 'src/productos/productos.module';
import { PromocionesProductosModule } from './promociones.productos.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([
    Promocion,
    TipoPromocion,
    TipoSeleccionProducto,
    TipoDescuento,
  ]),
    ProductosModule,
    PromocionesProductosModule
  ],
  controllers: [PromocionesController],
  providers: [PromocionesService, JwtService],
  exports: [PromocionesService]
})
export class PromocionesModule { }
