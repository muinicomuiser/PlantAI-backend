import { Area } from "./area";
import { Integrante } from "./integrante";
export declare class Equipo {
    nombre: string;
    lider: Integrante;
    scrumMaster: Integrante;
    areas: Area[];
    constructor(nombre: string, lider: Integrante, scrumMaster: Integrante, areas: Area[]);
}
