import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginacionDto } from '../dto/catalogo/paginacion.dto';
import { GetProductoDto } from '../dto/producto/get-producto.dto';
import { Producto } from '../entities/producto.entity';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) { }

  /**Retorna todos los productos */
  async findAll(
    paginacionDto: PaginacionDto,
  ): Promise<{ data: GetProductoDto[]; totalItems: number }> {
    const { page, pageSize } = paginacionDto;
    const limit = pageSize;
    const offset = (page - 1) * limit;
    const [result, totalItems] = await this.productoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: PRODUCTO_RELATIONS,
      where: {
        habilitado: true,
      },
    });
    const productos = result.map((producto) =>
      ProductoMapper.entityToDto(producto),
    );
    return { data: productos, totalItems };
  }

  findBestSellers() {
    return null;
  }

  findByRating(puntuacion: number) {
    return null;
  }

  findRecommended(id: number) {
    return null;
  }

  filterByPrice(min: number, max: number) {
    return null;
  }
}
