import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { CarroProducto } from 'src/carro-compras/entities/carro_producto.entity';
export declare class ProductosService {
    private readonly productoRepository;
    private readonly carroProductoRepository;
    constructor(productoRepository: Repository<Producto>, carroProductoRepository: Repository<CarroProducto>);
    getById(id: number): Promise<GetProductoDto>;
    getByFilters(): {
        mensaje: string;
    };
    getAll(): Promise<GetProductoDto[]>;
    create(createProductoDto: CreateProductoDto): Promise<GetProductoDto>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<GetProductoDto>;
    deleteOne(idProducto: number): Promise<Producto>;
}
