import { Module } from '@nestjs/common';
import { IaconsultasController } from './controller/iaconsultas.controller';
import { IaconsultasService } from './service/iaconsultas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorProducto } from 'src/commons/entities/color.entity';
import { Fotoperiodo } from 'src/productos/entities/plantas/fotoperiodo.entity';
import { HabitoCrecimiento } from 'src/productos/entities/plantas/habito_crecimiento.entity';
import { TipoRiego } from 'src/productos/entities/plantas/tipo_riego.entity';
import { Entorno } from 'src/productos/entities/plantas/entorno.entity';
import { Iluminacion } from 'src/productos/entities/plantas/iluminacion.entity';
import { Tamano } from 'src/productos/entities/plantas/tamano.entity';
import { ToleranciaTemperatura } from 'src/productos/entities/plantas/tolerancia_temperatura.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Fotoperiodo,
    TipoRiego,
    HabitoCrecimiento,
    ToleranciaTemperatura,
    Iluminacion,
    Tamano,
    Entorno,
    Producto
  ])],
  controllers: [IaconsultasController],
  providers: [IaconsultasService]
})
export class IaconsultasModule { }
