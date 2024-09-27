import { Area } from "../area";
import { Equipo } from "../equipo";
import { ECommerce } from "../ecommerce";
export declare class EquipoService {
    equipo: Equipo;
    areas: Area[];
    constructor();
    obtenerEquipo(): Equipo;
    obtenerEquipoPorArea(area: string): Area;
    obtenerAreas(): Area[];
    obtenerInformacionGeneral(): ECommerce;
}
