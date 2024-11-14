import { ProductosService } from '../service/productos.service';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    getById(id: number): Promise<GetProductoDto>;
    getByFilters(nombre: string, familia: string, fotoperiodo: string, tipoRiego: string, petFriendly: string, color: string): {
        mensaje: string;
    };
    createProduct(createProductoDto: CreateProductoDto): {
        mensaje: string;
    };
    updateProduct(id: number, updateProductoDto: UpdateProductoDto): {
        mensaje: string;
    };
    deleteOne(id: number): {
        mensaje: string;
    };
}
