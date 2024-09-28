import { ProductoSalidaDto } from 'src/productos/dto/producto-salida.dto';
import { CatalogoService } from '../service/catalogo.service';
export declare class CatalogoController {
  private readonly catalogoService;
  constructor(catalogoService: CatalogoService);
  findAll(): ProductoSalidaDto[];
  findBestSellers(): ProductoSalidaDto[];
  findByRating(puntuacion: number): ProductoSalidaDto[];
  findRecommended(id: number): ProductoSalidaDto[];
  filterbyPrice(minPrice: number, maxPrice: number): ProductoSalidaDto[];
}
