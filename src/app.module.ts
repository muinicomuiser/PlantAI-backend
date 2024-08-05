import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipoController } from './equipo/equipo.controller';
import { EquipoService } from './equipo/equipo.service';

@Module({
  imports: [],
  controllers: [AppController, EquipoController],
  providers: [AppService, EquipoService],
})
export class AppModule {}
