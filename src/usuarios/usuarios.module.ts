import { Module } from '@nestjs/common';
import { UsuariosService } from './service/usuarios.service';
import { UsuariosController } from './controller/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { TipoUsuario } from './entities/tipo_usuario.entity';
import { Direccion } from './entities/direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, TipoUsuario, Direccion])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
