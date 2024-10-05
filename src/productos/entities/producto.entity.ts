import { FotoPeriodo, TipoRiego } from './categorias';

export class Producto {
  id: number; //Identificador generado automáticamente
  // SKU: string;        //string, porque tiene números y guiones. Lo postergué.
  nombre: string;
  precio: number;
  imagen: string; //URL
  descripcion: string;
  cantidad: number; //Stock
  unidadesVendidas: number;
  puntuacion: number;
  familia: string; //<-- enum familia
  fotoperiodo: FotoPeriodo; //<-- enum FotoPeriodo
  tipoRiego: TipoRiego; //<-- enum TipoRiego
  petFriendly: boolean;
  color: string;

  constructor(
    nombre: string,
    precio: number,
    imagen: string = '',
    descripcion: string = '',
    cantidad: number = 0,
    familia: string = '',
    fotoperiodo: FotoPeriodo = undefined,
    tipoRiego: TipoRiego = undefined,
    petFriendly: boolean = false,
    color: string = '',
  ) {
    //Propiedades
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.cantidad = cantidad;

    //Atributos de inventario
    this.unidadesVendidas = 0;
    this.puntuacion = 0;

    //Atributos de categorías
    this.familia = familia;
    this.fotoperiodo = fotoperiodo;
    this.tipoRiego = tipoRiego;
    this.petFriendly = petFriendly;
    this.color = color;
  }
}
