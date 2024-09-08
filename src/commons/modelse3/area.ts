import { Integrante } from "./integrante";

export class Area{
    nombre: string;
    lider: Integrante;
    integrantes: Integrante[];
    constructor(nombre: string, lider: Integrante, integrantes: Integrante[]){
        this.nombre = nombre;
        this.lider = lider;
        this.integrantes = integrantes;
    }
}