import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
export declare class ProductosService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    getById(id: number): Promise<GetProductoDto>;
    getByFilters(): {
        mensaje: string;
    };
    getAll(): Promise<GetProductoDto[]>;
    create(): {
        mensaje: string;
    };
    update(): {
        mensaje: string;
    };
    deleteOne(id: number): {
        mensaje: string;
    };
}
