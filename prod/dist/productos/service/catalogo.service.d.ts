import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { PaginacionDto } from '../dto/catalogo/paginacion.dto';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
export declare class CatalogoService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    findAll(paginacionDto: PaginacionDto): Promise<{
        data: GetProductoDto[];
        totalItems: number;
    }>;
    findBestSellers(): any;
    findByRating(puntuacion: number): any;
    findRecommended(id: number): any;
    filterByPrice(min: number, max: number): any;
}
