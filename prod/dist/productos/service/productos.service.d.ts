import { ProductoSalidaDto } from '../dto/producto-salida.dto';
export declare class ProductosService {
    getById(id: number): ProductoSalidaDto;
    getByFilters(): ProductoSalidaDto[];
    getAll(): ProductoSalidaDto[];
}
