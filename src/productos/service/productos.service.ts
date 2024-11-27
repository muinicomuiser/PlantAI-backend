import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';
import { CreateProductoDto } from '../dto/producto/create-producto.dto';
import { UpdateProductoDto } from '../dto/producto/update-producto.dto';
import { CarroProducto } from 'src/carro-compras/entities/carro_producto.entity';
import { Planta } from '../entities/plantas/planta.entity';
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
  ) {}
  /**Retorna el producto cuyo id coincida con el ingresado.*/
  async getById(id: number): Promise<GetProductoDto> {
    const producto = await this.productoRepository.findOne({
      where: { id: id },
      relations: PRODUCTO_RELATIONS,
    });
    if (!producto) {
      throw new NotFoundException('No existe un producto con ese id.');
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
    const nuevoProducto = await this.productoRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const newProducto = transactionalEntityManager.create(
          Producto,
          createProductoDto as DeepPartial<Producto>,
        );
        if (createProductoDto.planta) {
          newProducto.planta = transactionalEntityManager.create(
            Planta,
            createProductoDto.planta as DeepPartial<Planta>,
          );
        }
        if (createProductoDto.macetero) {
          newProducto.macetero = transactionalEntityManager.create(
            Macetero,
            newProducto.macetero as DeepPartial<Macetero>,
          );
        }
        if (createProductoDto.insumo) {
          newProducto.insumo = transactionalEntityManager.create(
            Insumo,
            newProducto.insumo as DeepPartial<Insumo>,
          );
        }
        if (createProductoDto.accesorio) {
          newProducto.accesorio = transactionalEntityManager.create(
            Accesorio,
            newProducto.accesorio as DeepPartial<Accesorio>,
          );
        }
        const productoCreado =
          await transactionalEntityManager.save(newProducto);
        return productoCreado;
      },
    );
    return ProductoMapper.entityToDto(nuevoProducto);
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<GetProductoDto> {
    await this.getById(id);
    const updateProducto = await this.productoRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const producto = await transactionalEntityManager.findOne(Producto, {
          where: { id: id },
          relations: PRODUCTO_RELATIONS,
        });
        transactionalEntityManager.merge(
          Producto,
          producto,
          updateProductoDto as DeepPartial<Producto>,
        );
        if (updateProductoDto.planta) {
          transactionalEntityManager.merge(
            Planta,
            producto.planta,
            updateProductoDto.planta as DeepPartial<Planta>,
          );
        }
        if (updateProductoDto.macetero) {
          transactionalEntityManager.merge(
            Macetero,
            producto.macetero,
            updateProductoDto.macetero as DeepPartial<Macetero>,
          );
        }
        if (updateProductoDto.insumo) {
          transactionalEntityManager.merge(
            Insumo,
            producto.insumo,
            updateProductoDto.insumo as DeepPartial<Insumo>,
          );
        }
        if (updateProductoDto.accesorio) {
          transactionalEntityManager.merge(
            Accesorio,
            producto.accesorio,
            updateProductoDto.accesorio as DeepPartial<Accesorio>,
          );
        }
        return await transactionalEntityManager.save(producto);
      },
    );
    return ProductoMapper.entityToDto(updateProducto);
  }
  /**Elimina un producto según su id */
  async deleteOne(idProducto: number): Promise<GetProductoDto> {
    const producto = await this.productoRepository.findOne({
      where: { id: idProducto },
      relations: PRODUCTO_RELATIONS,
    });
    await this.productoRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(CarroProducto, {
          idProducto: idProducto,
        });
        await transactionalEntityManager.delete('productos_etiquetas', {
          id_producto: idProducto,
        });
        if (producto.planta) {
          await transactionalEntityManager.delete(
            Planta,
            producto.planta.idProducto,
          );
        }
        if (producto.macetero) {
          await transactionalEntityManager.delete(
            Macetero,
            producto.macetero.idProducto,
          );
        }
        if (producto.insumo) {
          await transactionalEntityManager.delete(
            Insumo,
            producto.insumo.idProducto,
          );
        }
        if (producto.accesorio) {
          await transactionalEntityManager.delete(
            Accesorio,
            producto.accesorio.idProducto,
          );
        }
        await transactionalEntityManager.delete(Producto, idProducto);
      },
    );
    return ProductoMapper.entityToDto(producto);
  }
}
