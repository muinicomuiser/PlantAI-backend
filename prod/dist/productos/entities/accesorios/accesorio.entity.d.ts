import { Marca } from 'src/commons/entities/marca.entity';
import { Producto } from '../producto.entity';
import { TipoAccesorio } from './tipo_accesorio.entity';
import { ColorProducto } from 'src/commons/entities/color.entity';
export declare class Accesorio {
    idProducto: number;
    idMarca: number;
    idTipoAccesorio: number;
    idColor: number;
    producto: Producto;
    marca: Marca;
    tipoAccesorio: TipoAccesorio;
    color: ColorProducto;
}
