import { CreateCarroCompraDto } from './create-carro-compra.dto';
import { Producto } from 'src/productos/entities/producto.entity';
declare const UpdateCarroCompraDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCarroCompraDto>>;
export declare class UpdateCarroCompraDto extends UpdateCarroCompraDto_base {
    productos: Producto[];
}
export {};
