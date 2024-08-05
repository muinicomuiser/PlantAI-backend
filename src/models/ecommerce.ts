// nombre, descripción breve, tipo
// de ecommerce, objetivo general y objetivos específicos).
export class ECommerce{
    nombre: string;
    descripcion: string;
    tipo: string;
    objetivoGeneral: string;
    objetivosEspecificos: string;
    constructor(nombre: string, descripcion: string, tipo: string, objetivoGeneral: string, objetivosEspecificos: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.objetivoGeneral = objetivoGeneral;
        this.objetivosEspecificos = objetivosEspecificos;
    }
}