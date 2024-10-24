import { GetProductoDto } from 'src/productos/dto/producto/get-producto.dto';
import { CatalogoService } from '../service/catalogo.service';
export declare class CatalogoController {
    private readonly catalogoService;
    constructor(catalogoService: CatalogoService);
    findAll(page?: number, pageSize?: number): Promise<{
        data: GetProductoDto[];
        totalItems: number;
    }>;
    findBestSellers(): any;
    findByRating(puntuacion: number): any;
    findRecommended(id: number): any;
    filterbyPrice(minPrice: number, maxPrice: number): any;
}
