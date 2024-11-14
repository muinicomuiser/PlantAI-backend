import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
export declare class ProductosService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    getById(id: number): Promise<GetProductoDto>;
    getByFilters(): {
        mensaje: string;
    };
    getAll(): Promise<GetProductoDto[]>;
    create(createProductoDto: CreateProductoDto): Promise<GetProductoDto>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<GetProductoDto>;
    deleteOne(id: number): Promise<import("typeorm").DeleteResult>;
}
