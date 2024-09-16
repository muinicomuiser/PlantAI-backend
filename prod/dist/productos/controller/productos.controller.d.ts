import { ProductosService } from '../service/productos.service';
import { ProductoSalidaDto } from '../dto/producto-salida.dto';
import { FotoPeriodo, TipoRiego } from '../entities/categorias';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    getById(id: number): ProductoSalidaDto;
    getByFilters(nombre: string, familia: string, fotoperiodo: FotoPeriodo, tipoRiego: TipoRiego, petFriendly: string, color: string): ProductoSalidaDto[];
}
