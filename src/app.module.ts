import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CarroComprasModule } from './carro-compras/carro-compras.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EquipoModule } from './commons/modelse3/equipo/equipo.module';
import { AuthModule } from './auth/auth.module';
import { GlobalMiddleware } from './commons/middleware/global.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { IaconsultasModule } from './iaconsultas/iaconsultas.module';

console.log(
  `Cargando archivo de entorno: .env.${process.env.AMBIENTE || 'dev'}`,
); //agrego interfaz para ver que archivo carga

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        [process.env.AMBIENTE != undefined
          ? `.env.${process.env.AMBIENTE}`
          : `.env.dev`, `.env.ia`],
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.env.RUTA_FISICA}` || `./imagenes/productos`,
      serveRoot: `${process.env.RUTA_ESTATICOS}` || `/estaticos/`,
    }),
    ProductosModule,
    CarroComprasModule,
    PedidosModule,
    UsuariosModule,
    EquipoModule,
    AuthModule,
    IaconsultasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalMiddleware).forRoutes('*');
  }
}
