import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { Producto } from '../entities/producto.entity';
export declare class ProductoMapperAux {
    static entityToDtoAux(producto: Producto): GetProductoDto;
}
