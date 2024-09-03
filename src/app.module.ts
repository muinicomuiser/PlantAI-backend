import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CarroComprasModule } from './carro-compras/carro-compras.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EquipoModule } from './equipo/equipo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductosModule, CarroComprasModule, PedidosModule, CatalogoModule, UsuariosModule, EquipoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
