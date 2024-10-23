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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.AMBIENTE != undefined
          ? `.env.${process.env.AMBIENTE}`
          : `.env.dev`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
<<<<<<< HEAD
      host: process.env.BD_HOST,
      port: parseInt(process.env.BD_PORT),
      username: process.env.BD_USERNAME,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_DATABASE,
=======
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
>>>>>>> 3ccfd55badab4ac9df849b4c5180ebb5b3c67300
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ProductosModule,
    CarroComprasModule,
    PedidosModule,
    UsuariosModule,
    EquipoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalMiddleware).forRoutes('*');
  }
}
