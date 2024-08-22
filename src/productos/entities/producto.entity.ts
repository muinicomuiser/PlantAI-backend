import { ApiProperty } from "@nestjs/swagger";
import { FotoPeriodo, TipoRiego } from "./categorias";

export class Producto {
    @ApiProperty()
    id: number;         //Identificador generado automáticamente
    // SKU: string;        //string, porque tiene números y guiones. Lo postergué.
    @ApiProperty()
    nombre: string;     
    @ApiProperty()
    precio: number;
    @ApiProperty()
    imagen: string;     //URL
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    cantidad: number    //Stock
    @ApiProperty()
    unidadesVendidas: number;
    @ApiProperty()
    puntuacion: number;
    @ApiProperty()
    especie: string;            //<-- enum Especie
    @ApiProperty()
    fotoperiodo: FotoPeriodo;   //<-- enum FotoPeriodo
    @ApiProperty()
    tipoRiego: TipoRiego;       //<-- enum TipoRiego
    @ApiProperty()
    petFriendly: boolean;
    @ApiProperty()
    color: string;

    constructor(nombre: string, precio: number, imagen: string = "", descripcion: string = '', cantidad: number = 0, especie: string = '', 
                fotoperiodo: FotoPeriodo = undefined, tipoRiego: TipoRiego = undefined, petFriendly: boolean = false, color: string = ''){
        
        //Propiedades
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        
        //Seguimiento
        this.unidadesVendidas = 0;
        this.puntuacion = 0;
        
        //Categorías
        this.especie = especie;
        this.fotoperiodo = fotoperiodo;
        this.tipoRiego = tipoRiego;
        this.petFriendly = petFriendly;
        this.color = color;
    }
}
