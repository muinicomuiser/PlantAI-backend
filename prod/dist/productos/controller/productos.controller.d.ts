import { ProductosService } from '../service/productos.service';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    getById(id: number): Promise<GetProductoDto>;
    createProduct(createProductoDto: CreateProductoDto): Promise<GetProductoDto>;
    updateProduct(id: number, updateProductoDto: UpdateProductoDto): Promise<GetProductoDto>;
    deleteOne(id: number): Promise<import("typeorm").DeleteResult>;
}
