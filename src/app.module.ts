import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CarroComprasModule } from './carro-compras/carro-compras.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EquipoModule } from './commons/modelse3/equipo/equipo.module';
import { AuthModule } from './auth/auth.module';
import { GlobalMiddleware } from './commons/middleware/global.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.AMBIENTE}` || `.env.dev`,
    }),
    ProductosModule,
    CarroComprasModule,
    PedidosModule,
    CatalogoModule,
    UsuariosModule,
    EquipoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GlobalMiddleware) //MIDDLEWARE A APLICAR
      .forRoutes('*'); //TODAS LAS RUTAS
  }
}
