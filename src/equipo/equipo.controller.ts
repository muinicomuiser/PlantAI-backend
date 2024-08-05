import { Controller, Get } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { Equipo } from 'src/models/equipo';

@Controller('equipo')
export class EquipoController {
    constructor(private readonly equipoService: EquipoService){}
    @Get()
    obtenerEquipo(): Equipo{
        return this.equipoService.obtenerEquipo()
    }
}
