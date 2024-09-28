import { Module } from '@nestjs/common';
import { CatalogoService } from './service/catalogo.service';
import { ProductosModule } from 'src/productos/productos.module';
import { CatalogoController } from './controller/catalogo.controller';

@Module({
  controllers: [CatalogoController],
  providers: [CatalogoService],
  imports: [ProductosModule],
})
export class CatalogoModule {}
