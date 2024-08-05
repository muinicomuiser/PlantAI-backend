import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipoController } from './equipo/equipo.controller';
import { EquipoService } from './equipo/equipo.service';
import { ProductosModule } from './productos/productos.module';
import { CarroComprasModule } from './carro-compras/carro-compras.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ProductosModule, CarroComprasModule, PedidosModule, CatalogoModule, UsuariosModule],
  controllers: [AppController, EquipoController],
  providers: [AppService, EquipoService],
})
export class AppModule {}
