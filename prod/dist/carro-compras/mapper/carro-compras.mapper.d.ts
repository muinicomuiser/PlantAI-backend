import { GetCarroProductoDto } from '../dto/get-carro-producto.dto';
import { CarroProducto } from '../entities/carro_producto.entity';
import { CarroCompra } from '../entities/carro.entity';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
export declare class CarroComprasMapper {
    static carroProductoEntityToDto(carroProducto: CarroProducto): GetCarroProductoDto;
    static arrayCarroProductosEntityToDto(carroProductos: CarroProducto[]): GetCarroProductoDto[];
    static carroEntityToDto(carro: CarroCompra): GetCarroComprasDto;
}
