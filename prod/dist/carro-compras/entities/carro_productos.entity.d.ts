import { Producto } from 'src/productos/entities/producto.entity';
import { CarroCompra } from './carros.entity';
export declare class ProductosCarro {
    idCarro: number;
    idProducto: number;
    cantidadProducto: number;
    carro: CarroCompra;
    producto: Producto;
}
