import { ProductoSalidaDto } from 'src/productos/dto/producto/get-producto.dto';
import { ProductosService } from 'src/productos/service/productos.service';
export declare class CatalogoService {
  private readonly productService;
  productos: ProductoSalidaDto[];
  constructor(productService: ProductosService);
  findAll(): ProductoSalidaDto[];
  findBestSellers(): ProductoSalidaDto[];
  findByRating(puntuacion: number): ProductoSalidaDto[];
  findRecommended(id: number): ProductoSalidaDto[];
  filterByPrice(min: number, max: number): ProductoSalidaDto[];
}
