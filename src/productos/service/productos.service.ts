import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { ProductoMapperAux } from '../mapper/ent-to-dto-aux';
import { CarroProducto } from 'src/carro-compras/entities/carro_producto.entity';
import { Planta } from '../entities/plantas/planta.entity';
import { Etiqueta } from '../entities/etiqueta.entity';
import { Macetero } from '../entities/maceteros/macetero.entity';
import { Insumo } from '../entities/insumos/insumo.entity';
import { Accesorio } from '../entities/accesorios/accesorio.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(CarroProducto)
    private readonly carroProductoRepository: Repository<CarroProducto>,
  ) { }
  /**Retorna el producto cuyo id coincida con el ingresado.*/
  async getById(id: number): Promise<GetProductoDto> {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
      relations: PRODUCTO_RELATIONS,
    });
    if (!producto) {
      throw new NotFoundException('No existe un producto con ese id.')
    }
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
    return ProductoMapperAux.entityToDtoAux(newProducto);
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
    await this.productoRepository.update(id, updateProductoDto);
    return this.getById(id);
  }
  /**Elimina un producto según su id */
  async deleteOne(idProducto: number) {
    const carroProductosEncontrados: CarroProducto[] = await this.carroProductoRepository.find({
      where: {
        idProducto: idProducto
      }
    });
    const eliminados = await this.carroProductoRepository.remove(carroProductosEncontrados)
    const productoEncontrado: Producto = await this.productoRepository.findOne({
      where: {
        id: idProducto
      },
      relations: [...PRODUCTO_RELATIONS]
    })
    productoEncontrado.etiquetas = []
    if (productoEncontrado.planta) {
      await this.productoRepository.manager.getRepository<Planta>(Planta).remove(productoEncontrado.planta)
    }
    if (productoEncontrado.accesorio) {
      await this.productoRepository.manager.getRepository<Accesorio>(Accesorio).remove(productoEncontrado.accesorio)
    }
    if (productoEncontrado.insumo) {
      await this.productoRepository.manager.getRepository<Insumo>(Insumo).remove(productoEncontrado.insumo)
    }
    if (productoEncontrado.macetero) {
      await this.productoRepository.manager.getRepository<Macetero>(Macetero).remove(productoEncontrado.macetero)
    }
    return await this.productoRepository.remove(productoEncontrado);
  }
}
