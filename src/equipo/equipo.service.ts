import { Injectable } from '@nestjs/common';
import { Area } from 'src/models/area';
import { Equipo } from 'src/models/equipo';
import { Integrante } from 'src/models/integrante';
import { textoGeneral } from 'src/models/textoGeneral';

/**Integrantes*/
let nicoLavanderos: Integrante = new Integrante("Nicolás Lavanderos", "UX/UI");
let danielAlfaro: Integrante = new Integrante("Daniel Alfaro", "UX/UI");
let vicenteDonoso: Integrante = new Integrante("Vicente Donoso", "UX/UI");
let makaGarabito: Integrante = new Integrante("Makarena Garabito", "UX/UI");
let jorgeSilva: Integrante = new Integrante("Jorge Silva", "UX/UI");
let estefaniaPerez: Integrante = new Integrante("Estefanía Pérez", "Frontend");
let nicoleVargas: Integrante = new Integrante("Nicole Vargas", "Frontend");
let karlaAcuna: Integrante = new Integrante("Karla Acuña", "Frontend");
let nicoDonoso: Integrante = new Integrante("Nicolás Donoso", "Backend");
let borisSuazo: Integrante = new Integrante("Boris Suazo", "Backend");
let nicoFernandez: Integrante = new Integrante("Nicolás Fernandez", "Backend");
let lucianoVillagran: Integrante = new Integrante("Luciano Villagrán", "Backend");
let vicenteLabbe: Integrante = new Integrante("Vicente Labbé", "Mobile");
let cesarSandoval: Integrante = new Integrante("Cesar Sandoval", "Mobile");

/**Áreas*/
let uxui: Area = new Area("UXUI", nicoLavanderos, [nicoLavanderos, danielAlfaro, vicenteDonoso, makaGarabito, jorgeSilva]);
let frontend: Area = new Area("Frontend", estefaniaPerez, [estefaniaPerez, nicoleVargas, karlaAcuna]);
let backend: Area = new Area("Backend", nicoDonoso, [nicoDonoso, borisSuazo, nicoFernandez, lucianoVillagran]);
let mobile: Area = new Area("Mobile", vicenteLabbe, [vicenteLabbe, cesarSandoval]);

@Injectable()
export class EquipoService {

    equipo: Equipo;
    areas: Area[] = [];

    constructor() {
        /**Inicialización del equipo.*/
        this.equipo = new Equipo("Bulbasaur", borisSuazo, nicoLavanderos, [uxui, frontend, backend, mobile]);
        this.areas.push(uxui, frontend, backend, mobile);
    }
    /**Prueba.  Retorna el equipo completo.*/
    obtenerEquipo(): Equipo {
        return this.equipo;
    }

    //Retorna equipo por área
    obtenerEquipoporArea(area: string) {
        for (let i of this.areas) {
            if (i.nombre.toLocaleLowerCase() == area.toLocaleLowerCase()) {
                return i;
            }
        }
        return null;
    }

    obtenerInformacionGeneral(): string {
        return textoGeneral;
    }
}
