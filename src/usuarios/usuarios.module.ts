import { Module } from '@nestjs/common';
import { UsuariosService } from './service/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { Direccion } from './entities/direccion.entity';
import { CarroComprasModule } from 'src/carro-compras/carro-compras.module';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { UsuarioMedioPago } from './entities/usuarios_medio_pago.entity';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { RolesGuard } from 'src/auth/guards/jwt-auth.guard/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ProductoPedido } from 'src/pedidos/entities/productos_pedido.entity';
import { Pago } from 'src/commons/entities/pagos.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro.entity';
import { LoggingModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Rol,
      Direccion,
      Pedido,
      UsuarioMedioPago,
      MedioPago,
      CarroCompra,
      ProductoPedido,
      Pago,
    ]),
    CarroComprasModule,
    JwtModule.register({}),
    LoggingModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, RolesGuard],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
