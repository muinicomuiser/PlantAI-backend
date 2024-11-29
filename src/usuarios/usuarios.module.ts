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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Rol,
      Direccion,
      Pedido,
      UsuarioMedioPago,
      MedioPago,
    ]),
    CarroComprasModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
