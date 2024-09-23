import { ProductosService } from '../service/productos.service';
import { ProductoSalidaDto } from '../dto/producto-salida.dto';
import { FotoPeriodo, TipoRiego } from '../entities/categorias';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    getById(id: number): ProductoSalidaDto;
    getByFilters(nombre: string, familia: string, fotoperiodo: FotoPeriodo, tipoRiego: TipoRiego, petFriendly: string, color: string): ProductoSalidaDto[];
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
