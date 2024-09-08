import { Module } from '@nestjs/common';
import { ProductosController } from './controller/productos.controller';
import { ProductosService } from './service/productos.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}
