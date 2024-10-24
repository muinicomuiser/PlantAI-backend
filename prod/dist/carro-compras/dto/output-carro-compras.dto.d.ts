import { Producto } from 'src/productos/entities/producto.entity';
export declare class OutputCarroComprasDto {
    id: number;
    idUsuario: number;
    productos: Producto[];
    precioTotal: number;
}
