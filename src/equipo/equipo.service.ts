import { Injectable } from '@nestjs/common';
import { Area } from 'src/models/area';
import { ECommerce } from 'src/models/ecommerce';
import { Equipo } from 'src/models/equipo';
import { Integrante } from 'src/models/integrante';

/**Integrantes*/
let nicoLavanderos: Integrante = new Integrante('Nicolás Lavanderos', 'UX/UI');
let danielAlfaro: Integrante = new Integrante('Daniel Alfaro', 'UX/UI');
let vicenteDonoso: Integrante = new Integrante('Vicente Donoso', 'UX/UI');
let makaGarabito: Integrante = new Integrante('Makarena Garabito', 'UX/UI');
let jorgeSilva: Integrante = new Integrante('Jorge Silva', 'UX/UI');
let estefaniaPerez: Integrante = new Integrante('Estefanía Pérez', 'Frontend');
let nicoleVargas: Integrante = new Integrante('Nicole Vargas', 'Frontend');
let karlaAcuna: Integrante = new Integrante('Karla Acuña', 'Frontend');
let nicoDonoso: Integrante = new Integrante('Nicolás Donoso', 'Backend');
let borisSuazo: Integrante = new Integrante('Boris Suazo', 'Backend');
let nicoFernandez: Integrante = new Integrante('Nicolás Fernandez', 'Backend');
let lucianoVillagran: Integrante = new Integrante(
    'Luciano Villagrán',
    'Backend',
);
let vicenteLabbe: Integrante = new Integrante('Vicente Labbé', 'Mobile');
let cesarSandoval: Integrante = new Integrante('Cesar Sandoval', 'Mobile');

/**Áreas*/
let uxui: Area = new Area('UXUI', nicoLavanderos, [
    nicoLavanderos,
    danielAlfaro,
    vicenteDonoso,
    makaGarabito,
    jorgeSilva,
]);
let frontend: Area = new Area('Frontend', estefaniaPerez, [
    estefaniaPerez,
    nicoleVargas,
    karlaAcuna,
]);
let backend: Area = new Area('Backend', nicoDonoso, [
    nicoDonoso,
    borisSuazo,
    nicoFernandez,
    lucianoVillagran,
]);
let mobile: Area = new Area('Mobile', vicenteLabbe, [
    vicenteLabbe,
    cesarSandoval,
]);

@Injectable()
export class EquipoService {
    equipo: Equipo;
    areas: Area[] = [];

    constructor() {
        /**Inicialización de equipo y arreglo de áreas.*/
        this.equipo = new Equipo('Cotiledón', borisSuazo, nicoLavanderos, [
            uxui,
            frontend,
            backend,
            mobile,
        ]);
        this.areas.push(uxui, frontend, backend, mobile);
    }

    /**Retorna el equipo completo.*/
    obtenerEquipo(): Equipo {
        return this.equipo;
    }

    /**Retorna un área del equipo.*/
    obtenerEquipoPorArea(area: string): Area {
        for (let i of this.areas) {
            if (i.nombre.toLocaleLowerCase() == area.toLocaleLowerCase()) {
                return i;
            }
        }
        return null;
    }
    
    /**Retorna un arreglo con todas las áreas del equipo.*/
    obtenerAreas(): Area[] {
        return this.areas;
    }

    /**Retorna un texto con la información general del ecommerce.*/
    obtenerInformacionGeneral(): ECommerce {
        const infoEcommerce: ECommerce = new ECommerce(
            'PlantAI',
            'Un E-commerce integrado con IA y AR para conectar a clientes con la naturaleza a través de recomendaciones personalizadas ',
            'B2C (Business 2 Client)',
            'Crear un e-commerce tipo Marketplace B2C para la venta de plantas y productos relacionados con la botánica, implementando un sistema de recomendación basado en IA y visualización en VR, que proporcione una experiencia de compra y venta fluida, intuitiva y accesible. Se propone una plataforma de navegación sencilla, buscando maximizar tanto la cantidad de viveros que publiquen en la plataforma, como las transacciones realizadas y la fidelización.',
            `- Desarrollar una plataforma accesible y fácil de usar.
        - Ampliar la oferta de plantas y productos relacionados.
    - Optimizar los procesos de Compra y Venta.
    - Promover la fidelización de usuarios.
    - Brindar soporte y asistencia al cliente.`,
        );
        return infoEcommerce;
    }
}
