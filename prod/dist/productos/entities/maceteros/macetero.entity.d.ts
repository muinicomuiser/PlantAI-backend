import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoMacetero } from './tipo_macetero.entity';
export declare class Macetero {
    idProducto: number;
    material: string;
    forma: string;
    diametro: number;
    idMarca: number;
    idTipoMacetero: number;
    litros: number;
    producto: Producto;
    marca: Marca;
    tipoMacetero: TipoMacetero;
}
