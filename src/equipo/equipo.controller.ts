import { Controller, Get, Param, Res } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { Equipo } from 'src/models/equipo';
import { Response } from 'express';
import { Area } from 'src/models/area';
import { ECommerce } from 'src/models/ecommerce';

@Controller('equipo')
export class EquipoController {
    constructor(private readonly equipoService: EquipoService) { }

    /**Responde con toda la información del equipo.*/
    @Get()
    obtenerEquipo(@Res() response: Response): void {
        const equipo: Equipo = this.equipoService.obtenerEquipo();
        response.status(200).send(equipo)
    }

    /**Responde con un texto con información sobre el ecommerce.*/
    @Get('cotiledon')
    obtenerInformacionGeneral(@Res() response: Response): void {
        const informacion: ECommerce = this.equipoService.obtenerInformacionGeneral();
        response.status(200).send(informacion)
    }

    /**Responde con información del área del equipo correspondiente al parámetro ingresado.*/
    @Get(':area')
    obtenerEquipoPorArea(@Param('area') area: string, @Res() response: Response): void {
        const areaObtenida: Area = this.equipoService.obtenerEquipoPorArea(area);
        if (areaObtenida) {
            response.status(200).send(areaObtenida)
        }
        else {
            response.status(404).send('No existe un área con ese nombre.')
        }
    }
}
