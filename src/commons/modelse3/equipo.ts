import { Area } from "./area";
import { Integrante } from "./integrante";

export class Equipo{
    nombre: string;
	lider: Integrante
	scrumMaster: Integrante;
	areas: Area[];
    constructor(nombre: string, lider: Integrante, scrumMaster: Integrante, areas: Area[]){
        this.nombre = nombre;
        this.lider = lider;
        this.scrumMaster = scrumMaster;
        this.areas = areas;
    }
}