import { Module } from '@nestjs/common';
import { ProductosController } from './controller/productos.controller';
import { ProductosService } from './service/productos.service';
import { CatalogoController } from './controller/catalogo.controller';
import { CatalogoService } from './service/catalogo.service';

@Module({
  controllers: [ProductosController, CatalogoController],
  providers: [ProductosService, CatalogoService],
  exports: [ProductosService],
})
export class ProductosModule {}
