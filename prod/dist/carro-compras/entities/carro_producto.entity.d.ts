import { Producto } from 'src/productos/entities/producto.entity';
import { CarroCompra } from './carro.entity';
export declare class CarroProducto {
    idCarro: number;
    idProducto: number;
    cantidadProducto: number;
    carro: CarroCompra;
    producto: Producto;
}
