import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';

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

  //
  async create(createProductoDto: CreateProductoDto): Promise<GetProductoDto> {
    const newProducto = await this.productoRepository.save(createProductoDto);
    return ProductoMapper.entityToDto(newProducto);
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findEntityById(id);
    await this.productoRepository.update(id, updateProductoDto);
    const productoActualizado = await this.findEntityById(id);
    return ProductoMapper.entityToDto(productoActualizado);
  }

  /**Elimina un producto según su id */
  async deleteOne(id: number) {
    await this.findEntityById(id);
    return this.productoRepository.delete(id);
  }

  async findEntityById(id: number) {
    const producto = this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }
}
