import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  /**Retorna el producto cuyo id coincida con el ingresado.*/
  async getById(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
      relations: [
        'categoria',
        'etiquetas',
        'planta',
        'accesorio',
        'macetero',
        'insumo',
        'planta.especie',
        'planta.fotoPeriodo',
        'planta.habitoCrecimiento',
        'planta.tipoRiego',
        'planta.color',
        'accesorio.tipoAccesorio',
        'accesorio.marca',
        'insumo.tipoInsumo',
        'insumo.marca',
        'macetero.tipoMacetero',
        'macetero.marca',
      ],
    });
    return ProductoMapper.entityToDto(producto);
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
