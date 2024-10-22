import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {
  /**Retorna el producto cuyo id coincida con el ingresado.*/
  getById(id: number) {
    return null;
  }

  /**Retorna el conjunto de productos que coincida con los filtros.*/
  getByFilters() {
    return null;
  }

  /**Retorna todos los productos registrados.*/
  getAll() {
    return null;
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
