import { Categoria } from './categoria.entity';
import { Etiqueta } from './etiqueta.entity';
import { Planta } from './plantas/planta.entity';
import { Macetero } from './maceteros/macetero.entity';
import { Accesorio } from './accesorios/accesorio.entity';
import { Insumo } from './insumos/insumo.entity';
export declare class Producto {
    id: number;
    SKU: string;
    nombre: string;
    idCategoria: number;
    precio: number;
    descripcion: string;
    imagen: string;
    cantidad: number;
    unidadesVendidas: number;
    puntuacion: number;
    ancho: number;
    alto: number;
    largo: number;
    peso: number;
    categoria: Categoria;
    etiquetas: Etiqueta[];
    planta: Planta;
    macetero: Macetero;
    accesorio: Accesorio;
    insumo: Insumo;
}
