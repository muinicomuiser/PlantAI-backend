import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  /**Retorna el producto cuyo id coincida con el ingresado.*/
  async getById(id: number): Promise<GetProductoDto> {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
      relations: PRODUCTO_RELATIONS,
    });
    return ProductoMapper.entityToDto(producto);
  }

  /**Retorna el conjunto de productos que coincida con los filtros.*/
  getByFilters() {
    return { mensaje: 'endpoint en desarrollo' };
  }

  /**Retorna todos los productos registrados.*/
  async getAll(): Promise<GetProductoDto[]> {
    const productos = await this.productoRepository.find({
      relations: PRODUCTO_RELATIONS,
    });
    return productos.map((producto) => ProductoMapper.entityToDto(producto));
  }

  create() {
    return { mensaje: 'endpoint en desarrollo' };
  }

  update() {
    return { mensaje: 'endpoint en desarrollo' };
  }

  /**Elimina un producto según su id */
  deleteOne(id: number) {
    return { mensaje: 'endpoint en desarrollo' };
  }
}
