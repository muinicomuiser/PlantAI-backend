import { Controller, Get, Param } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { Equipo } from 'src/models/equipo';

@Controller('equipo')
export class EquipoController {
    constructor(private readonly equipoService: EquipoService) { }

    /**Prueba.  Entrega todo el equipo.*/
    @Get()
    obtenerEquipo(): Equipo {
        return this.equipoService.obtenerEquipo()
    }

    @Get(':area')
    obtenerEquipoporArea(@Param('area') area: string) {
        return this.equipoService.obtenerEquipoporArea(area);
    }

    @Get('informacion/cotiledon')
    obtenerInformacionGeneral(): string {
        return this.equipoService.obtenerInformacionGeneral();
    }
}
