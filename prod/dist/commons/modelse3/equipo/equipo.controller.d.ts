import { EquipoService } from './equipo.service';
import { Response } from 'express';
export declare class EquipoController {
    private readonly equipoService;
    constructor(equipoService: EquipoService);
    obtenerEquipo(response: Response): void;
    obtenerEquipoPorArea(area: string, response: Response): void;
    obtenerAreas(): import("../area").Area[];
    obtenerInformacionGeneral(): import("../ecommerce").ECommerce;
}
