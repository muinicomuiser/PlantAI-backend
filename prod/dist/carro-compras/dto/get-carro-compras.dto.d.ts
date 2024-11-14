import { GetCarroProductoDto } from './get-carro-producto.dto';
export declare class GetCarroComprasDto {
    id: number;
    idUsuario: number;
    precioTotal: number;
    carroProductos: GetCarroProductoDto[];
}
