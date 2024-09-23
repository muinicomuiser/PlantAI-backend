import { FotoPeriodo, TipoRiego } from "../entities/categorias";

export class CreateProductoDto {
    nombre: string;
    precio: number;
    imagen: string;     //URL
    descripcion: string;
    cantidad: number    //Stock
    unidadesVendidas: number;
    puntuacion: number;
    familia: string;            //<-- enum familia
    fotoperiodo: FotoPeriodo;   //<-- enum FotoPeriodo
    tipoRiego: TipoRiego;       //<-- enum TipoRiego
    petFriendly: boolean;
    color: string;
}
