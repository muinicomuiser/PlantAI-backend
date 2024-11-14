import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoInsumo } from './tipo_insumo.entity';
export declare class Insumo {
    idProducto: number;
    idTipoInsumo: number;
    idMarca: number;
    producto: Producto;
    marca: Marca;
    tipoInsumo: TipoInsumo;
}
