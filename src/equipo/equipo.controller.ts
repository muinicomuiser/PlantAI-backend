import { Controller, Get, Param, Res } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { Equipo } from 'src/models/equipo';
import { Response } from 'express';
import { Area } from 'src/models/area';
import { ECommerce } from 'src/models/ecommerce';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Equipo')
@Controller('equipo')
export class EquipoController {
    constructor(private readonly equipoService: EquipoService) { }

    /**Responde con toda la información del equipo.*/
    @ApiOperation({ summary: 'Obtener toda la información del equipo' })
    @Get()
    obtenerEquipo(@Res() response: Response): void {
        const equipo: Equipo = this.equipoService.obtenerEquipo();
        response.status(200).send(equipo);
    }

    /**Responde con información del área del equipo correspondiente al parámetro ingresado.*/
    @ApiOperation({ summary: 'Obtener área por nombre' })
    @Get('area/:area')
    obtenerEquipoPorArea(@Param('area') area: string, @Res() response: Response): void {
        const areaObtenida: Area = this.equipoService.obtenerEquipoPorArea(area);
        if (areaObtenida) {
            response.status(200).send(areaObtenida);
        }
        else {
            response.status(404).send('No existe un área con ese nombre.');
        }
    }
    /**Responde con un arreglo de todas las áreas del equipo.*/
    @ApiOperation({ summary: 'Obtener todas las áreas' })
    @Get('area')
    obtenerAreas(@Res() response: Response): void {
        const areas: Area[] = this.equipoService.obtenerAreas();
        response.status(200).send(areas);
    }
        
    /**Responde con un texto con información sobre el ecommerce.*/
    @ApiOperation({ summary: 'Obtener información del ecommerce' })
    @Get('cotiledon')
    obtenerInformacionGeneral(@Res() response: Response): void {
        const informacion: ECommerce = this.equipoService.obtenerInformacionGeneral();
        response.status(200).send(informacion);
    }
}
