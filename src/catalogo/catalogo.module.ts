import { Module } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CatalogoController } from './catalogo.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  controllers: [CatalogoController],
  providers: [CatalogoService],
  imports: [ProductosModule]
})
export class CatalogoModule { }
