import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entorno } from 'src/productos/entities/plantas/entorno.entity';
import { Fotoperiodo } from 'src/productos/entities/plantas/fotoperiodo.entity';
import { Iluminacion } from 'src/productos/entities/plantas/iluminacion.entity';
import { Tamano } from 'src/productos/entities/plantas/tamano.entity';
import { TipoRiego } from 'src/productos/entities/plantas/tipo_riego.entity';
import { ToleranciaTemperatura } from 'src/productos/entities/plantas/tolerancia_temperatura.entity';
import { IaconsultasController } from './controller/iaconsultas.controller';
import { IaconsultasService } from './service/iaconsultas.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Entorno,
    TipoRiego,
    Fotoperiodo,
    ToleranciaTemperatura,
    Iluminacion,
    Tamano,
  ])],
  controllers: [IaconsultasController],
  providers: [IaconsultasService]
})
export class IaconsultasModule { }
