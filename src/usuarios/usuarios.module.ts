import { Module } from '@nestjs/common';
import { UsuariosService } from './service/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { Direccion } from './entities/direccion.entity';
import { CarroComprasModule } from 'src/carro-compras/carro-compras.module';

@Module({

  imports: [TypeOrmModule.forFeature([Usuario, Rol, Direccion]), CarroComprasModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule { }
