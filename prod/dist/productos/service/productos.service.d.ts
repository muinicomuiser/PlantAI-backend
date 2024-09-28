import { ProductoSalidaDto } from '../dto/producto-salida.dto';
export declare class ProductosService {
  productosSalida: ProductoSalidaDto[];
  getById(id: number): ProductoSalidaDto;
  getByFilters(): ProductoSalidaDto[];
  getAll(): ProductoSalidaDto[];
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
