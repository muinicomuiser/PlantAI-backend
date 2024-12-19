import { Module } from '@nestjs/common';
import { IaconsultasController } from './controller/iaconsultas.controller';
import { IaconsultasService } from './service/iaconsultas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorProducto } from 'src/commons/entities/color.entity';
import { Especie } from 'src/productos/entities/plantas/especie.entity';
import { Fotoperiodo } from 'src/productos/entities/plantas/fotoperiodo.entity';
import { HabitoCrecimiento } from 'src/productos/entities/plantas/habito_crecimiento.entity';
import { TipoRiego } from 'src/productos/entities/plantas/tipo_riego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Especie,
    ColorProducto,
    Fotoperiodo,
    TipoRiego,
    HabitoCrecimiento,
  ])],
  controllers: [IaconsultasController],
  providers: [IaconsultasService]
})
export class IaconsultasModule { }
