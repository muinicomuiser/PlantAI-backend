import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FiltrosCatalogoDto,
  SearchCatalogoDto,
} from '../dto/catalogo/paginacion.dto';
import { GetProductosPaginadosDto } from '../dto/producto/get-productos-paginados-dto';
import { Producto } from '../entities/producto.entity';
import { ProductoMapper } from '../mapper/entity-to-dto-producto';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) { }

  /**Retorna todos los productos */
  async findAll(
    filtrosCatalogoDto: FiltrosCatalogoDto,
  ): Promise<GetProductosPaginadosDto> {
    try {
      const {
        page,
        pageSize,
        idEntorno,
        petFriendly,
        idIluminacion,
        idTipoRiego,
        idToleranciaTemperatura,
        maxPrecio,
        minPrecio,
        ordenarPor,
        puntuacion,
        orden,
        sizePlant,
      } = filtrosCatalogoDto;
      const limit = pageSize;
      const offset = (page - 1) * limit;
      const queryBuilder = this.productoRepository
        .createQueryBuilder('producto')
        .innerJoinAndSelect('producto.categoria', 'categoria')
        .leftJoinAndSelect('producto.planta', 'planta')
        .leftJoinAndSelect('planta.entorno', 'entorno')
        .leftJoinAndSelect('producto.imagenes', 'imagenes')
        .leftJoinAndSelect('planta.iluminacion', 'iluminacion')
        .leftJoinAndSelect('planta.tipoRiego', 'tipoRiego')
        .leftJoinAndSelect(
          'planta.toleranciaTemperatura',
          'toleranciaTemperatura',
        )
        .leftJoinAndSelect('planta.color', 'color')
        .leftJoinAndSelect('planta.fotoPeriodo', 'fotoPeriodo')
        .leftJoinAndSelect('planta.habitoCrecimiento', 'habitoCrecimiento')
        .leftJoinAndSelect('planta.tamano', 'tamano')
        .where('producto.habilitado = :habilitado', { habilitado: true })
        .andWhere('producto.idCategoria = :idCategoria', { idCategoria: 1 });

      if (idEntorno) {
        queryBuilder.andWhere('planta.idEntorno = :idEntorno', {
          idEntorno,
        });
      }
      if (petFriendly) {
        queryBuilder.andWhere('planta.petFriendly = :petFriendly', {
          petFriendly,
        });
      }
      if (idIluminacion) {
        queryBuilder.andWhere('planta.idIluminacion = :idIluminacion', {
          idIluminacion,
        });
      }
      if (idTipoRiego) {
        queryBuilder.andWhere('planta.idTipoRiego = :idTipoRiego', {
          idTipoRiego,
        });
      }
      if (idToleranciaTemperatura) {
        queryBuilder.andWhere(
          'planta.idToleranciaTemperatura = :idToleranciaTemperatura',
          { idToleranciaTemperatura },
        );
      }
      if (maxPrecio) {
        queryBuilder.andWhere('producto.precio <= :maxPrecio', { maxPrecio });
      }
      if (minPrecio) {
        queryBuilder.andWhere('producto.precio >= :minPrecio', { minPrecio });
      }
      if (puntuacion) {
        queryBuilder.andWhere('producto.puntuacion >= :puntuacion', {
          puntuacion,
        });
      }
      if (sizePlant) {
        queryBuilder.andWhere('planta.tamano = :sizePlant', { sizePlant });
      }

      if (ordenarPor) {
        queryBuilder.orderBy(`producto.${ordenarPor}`, orden || 'ASC');
      }

      queryBuilder.skip(offset).take(limit);

      const [result, totalItems] = await queryBuilder.getManyAndCount();
      return { data: ProductoMapper.entitiesToDtos(result), totalItems };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // retorna producto por busqueda

  async findBySearch(
    searchCatalogoDto: SearchCatalogoDto,
  ): Promise<GetProductosPaginadosDto> {
    try {
      const { page, pageSize, search } = searchCatalogoDto;
      const limit = pageSize;
      const offset = (page - 1) * limit;
      const queryBuilder = this.productoRepository
        .createQueryBuilder('producto')
        .innerJoinAndSelect('producto.categoria', 'categoria')
        .leftJoinAndSelect('producto.planta', 'planta')
        .leftJoinAndSelect('planta.entorno', 'entorno')
        .leftJoinAndSelect('producto.imagenes', 'imagenes')
        .leftJoinAndSelect('planta.iluminacion', 'iluminacion')
        .leftJoinAndSelect('planta.tipoRiego', 'tipoRiego')
        .leftJoinAndSelect(
          'planta.toleranciaTemperatura',
          'toleranciaTemperatura',
        )
        .leftJoinAndSelect('planta.color', 'color')
        .leftJoinAndSelect('planta.fotoPeriodo', 'fotoPeriodo')
        .leftJoinAndSelect('planta.habitoCrecimiento', 'habitoCrecimiento')
        .leftJoinAndSelect('planta.tamano', 'tamano')
        .where('producto.habilitado = :habilitado', { habilitado: true })
        .andWhere('producto.idCategoria = :idCategoria', { idCategoria: 1 })
        .andWhere('producto.nombre LIKE :search', { search: `%${search}%` });

      queryBuilder.skip(offset).take(limit);

      const [result, totalItems] = await queryBuilder.getManyAndCount();
      return { data: ProductoMapper.entitiesToDtos(result), totalItems };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
