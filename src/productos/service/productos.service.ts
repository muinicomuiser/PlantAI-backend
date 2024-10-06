import { Injectable } from '@nestjs/common';
import { ProductoSalidaDto } from '../dto/producto-salida.dto';
import { ProductsDtoExamples } from '../examples/productsDTO.examples';

@Injectable()
export class ProductosService {
  productosSalida: ProductoSalidaDto[] = [...ProductsDtoExamples];

  /**Retorna el producto cuyo id coincida con el ingresado.*/
  getById(id: number): ProductoSalidaDto {
    return this.productosSalida[0];
  }

  /**Retorna el conjunto de productos que coincida con los filtros.*/
  getByFilters(): ProductoSalidaDto[] {
    return this.productosSalida;
  }

  /**Retorna todos los productos registrados.*/
  getAll(): ProductoSalidaDto[] {
    return this.productosSalida;
  }

  create() {
    return { mensaje: 'Producto creado' };
  }

  update() {
    return { mensaje: 'Producto actualizado' };
  }

  /**Elimina un producto según su id */
  deleteOne(id: number) {
    return { mensaje: 'Producto eliminado' };
  }
}
