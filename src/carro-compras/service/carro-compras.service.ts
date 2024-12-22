import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { PRODUCTO_RELATIONS } from 'src/productos/shared/constants/producto-relaciones';
import { In, IsNull, Repository } from 'typeorm';
import { AddProductCarro } from '../dto/add-product-carro';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { GetCarroProductoDto } from '../dto/get-carro-producto.dto';
import { UpdateContenidoCarroDto } from '../dto/update-carro-compra.dto';
import { UpdateProductCarro } from '../dto/update-product-carro';
import { CarroCompra } from '../entities/carro.entity';
import { CarroProducto } from '../entities/carro_producto.entity';
import { CarroComprasMapper } from '../mapper/carro-compras.mapper';
import { CARRO_PRODUCTOS_RELATIONS } from '../shared/constants/carro-productos-relaciones';
import { CARRO_RELATIONS } from '../shared/constants/carro-relaciones';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';
import { NoStockProductosCarroDto } from '../dto/no-stock-carro-productos.dto';

@Injectable()
export class CarroComprasService {
  constructor(
    @InjectRepository(CarroCompra)
    private readonly carroComprasRepository: Repository<CarroCompra>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(CarroProducto)
    private readonly carroProductoRepository: Repository<CarroProducto>,
  ) { }

  /**Crea un carro activo a un usuario. */
  async createCarro(idUsuario: number): Promise<GetCarroComprasDto> {
    const nuevoCarro = new CarroCompra(idUsuario);
    const carroGuardado = await this.carroComprasRepository.save(nuevoCarro);
    return CarroComprasMapper.carroEntityToDto(carroGuardado);
  }

  /**Retorna un DTO de carro de compras según su id. */
  async findByCarroId(id: number): Promise<GetCarroComprasDto> {
    const carroEncontrado: CarroCompra =
      await this.carroComprasRepository.findOne({
        where: {
          id: id,
        },
        relations: ['carroProductos', ...CARRO_RELATIONS],
      });
    return CarroComprasMapper.carroEntityToDto(carroEncontrado);
  }

  async findAll(): Promise<GetCarroComprasDto[]> {
    let encontrados: CarroCompra[];
    try {
      encontrados = await this.carroComprasRepository.find({
        relations: [...CARRO_RELATIONS],
      });
      return CarroComprasMapper.arrayCarroEntityToDto(encontrados);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al obtener carros.', error);
    }
  }

  /**Retorna un DTO del carro de compras activo de un usuario según su id. */
  async findByUserId(id: number): Promise<GetCarroComprasDto> {
    const carroEncontrado: CarroCompra =
      await this.carroComprasRepository.findOne({
        where: {
          idUsuario: id,
          fecha_cierre: IsNull(),
        },
        relations: ['carroProductos', ...CARRO_RELATIONS],
      });
    if (!carroEncontrado) {
      throw new NotFoundException(
        'No existe un carro activo para este usuario.',
      );
    }
    return CarroComprasMapper.carroEntityToDto(carroEncontrado);
  }

  async addProductToCarro(idCarro: number, addProductDto: AddProductCarro) {
    const producto = await this.productoRepository.findOne({
      where: {
        id: addProductDto.productoId,
      },
      relations: [...PRODUCTO_RELATIONS],
    });

    //busca en el carro si ya existe un producto agregado
    let carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: addProductDto.productoId,
      },
      relations: [...CARRO_PRODUCTOS_RELATIONS],
    });
    //si producto existe, aumenta cantidad
    if (carroProducto) {
      carroProducto.cantidadProducto += addProductDto.cantidadProducto;
    } else {
      carroProducto = this.carroProductoRepository.create({
        idCarro: idCarro,
        idProducto: addProductDto.productoId,
        cantidadProducto: addProductDto.cantidadProducto,
      });
    }
    const carroProductGuardado =
      await this.carroProductoRepository.save(carroProducto);
    carroProductGuardado.producto = producto;
    return CarroComprasMapper.carroProductoEntityToDto(carroProductGuardado);
  }

  async updateProductQuantity(idCarro: number, updateDto: UpdateProductCarro) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: updateDto.productoId,
      },
      relations: [...CARRO_PRODUCTOS_RELATIONS],
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en el carro');
    }
    const producto = await this.productoRepository.findOne({
      where: {
        id: updateDto.productoId,
      },
      relations: [...PRODUCTO_RELATIONS],
    });
    carroProducto.cantidadProducto = updateDto.cantidadProducto;
    const carroProductoActualizado =
      await this.carroProductoRepository.save(carroProducto);
    carroProductoActualizado.producto = producto;
    return CarroComprasMapper.carroProductoEntityToDto(
      carroProductoActualizado,
    );
  }

  async removeProductCarro(
    idCarro: number,
    idProducto: number,
  ): Promise<GetCarroProductoDto> {
    try {
      const carroProducto = await this.carroProductoRepository.findOne({
        where: {
          idCarro: idCarro,
          idProducto: idProducto,
        },
        relations: [...CARRO_PRODUCTOS_RELATIONS],
      });

      if (!carroProducto) {
        throw new NotFoundException('Producto no encontrado en carro');
      }
      await this.carroProductoRepository.remove(carroProducto);
      return CarroComprasMapper.carroProductoEntityToDto(carroProducto);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteCarro(idCarro: number) {
    await this.carroComprasRepository.softDelete(idCarro);
    return { message: `Carro con ID ${idCarro} eliminado con éxito` };
  }

  async replaceProductosCarro(
    idCarro: number,
    updateCarroDto: UpdateContenidoCarroDto,
  ): Promise<GetCarroProductoDto[]> {
    try {
      const idProductos: number[] = updateCarroDto.productosCarro.map(
        (productoCarro) => productoCarro.productoId,
      );
      /**Verificar productos repetidos */
      const setIds: Set<number> = new Set(idProductos);
      if (setIds.size !== idProductos.length) {
        const carroProductosFiltrados: UpdateProductCarro[] = [];
        setIds.forEach((id) => {
          const carroProductosPorId: UpdateProductCarro[] =
            updateCarroDto.productosCarro.filter(
              (producto) => producto.productoId == id,
            );
          if (carroProductosPorId.length == 1) {
            carroProductosFiltrados.push(carroProductosPorId[0]);
          } else {
            carroProductosPorId[0].cantidadProducto =
              carroProductosPorId.reduce(
                (acumulador, valorActual) =>
                  acumulador + valorActual.cantidadProducto,
                0,
              );
            carroProductosFiltrados.push(carroProductosPorId[0]);
          }
        });
        updateCarroDto.productosCarro = carroProductosFiltrados;
      }

      /**Obtener productos actualizados del carro */
      const productosEncontrados: Producto[] =
        await this.productoRepository.find({
          relations: [...PRODUCTO_RELATIONS],
          where: {
            id: In(idProductos),
          },
        });
      await this.carroProductoRepository.delete({
        idCarro: idCarro,
      });
      const nuevosCarroProductos: CarroProducto[] =
        updateCarroDto.productosCarro.map((productoCarro) => {
          const nuevoCarroProducto: CarroProducto = new CarroProducto();
          nuevoCarroProducto.idCarro = idCarro;
          nuevoCarroProducto.idProducto = productoCarro.productoId;
          nuevoCarroProducto.cantidadProducto = productoCarro.cantidadProducto;
          return nuevoCarroProducto;
        });
      await this.carroProductoRepository.save(nuevosCarroProductos);
      nuevosCarroProductos.forEach((carroProducto) => {
        carroProducto.producto = productosEncontrados.find(
          (producto) => producto.id == carroProducto.idProducto,
        );
      });
      return CarroComprasMapper.arrayCarroProductosEntityToDto(
        nuevosCarroProductos,
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error al reemplazar contenido del carro');
    }
  }

  async closeCarro(idUsuario: number, pedido: CreatePedidoDto): Promise<GetCarroComprasDto> {
    try {
      const carroCerrado: CarroCompra = await this.carroComprasRepository.findOne({
        where: {
          idUsuario: idUsuario,
          fecha_cierre: IsNull()
        },
        relations: ['carroProductos', ...CARRO_RELATIONS]
      })
      console.log(carroCerrado)
      // carroCerrado.fecha_cierre = pedido.fechaCreacion
      await this.carroComprasRepository.update({ id: carroCerrado.id }, { fecha_cierre: pedido.fechaCreacion })
      return CarroComprasMapper.carroEntityToDto(carroCerrado)
    }
    catch (error) {
      console.error(error)
      throw new BadRequestException('Error al cerrar el Carro')
    }
  }

  async validateProductosCarro(idCarro: number, contenidoCarroDto: UpdateContenidoCarroDto): Promise<GetCarroProductoDto[]> {
    try {
      const idProductos: number[] = contenidoCarroDto.productosCarro.map(productoCarro => productoCarro.productoId)
      const productos: Producto[] = await this.productoRepository.find({
        where: {
          id: In(idProductos)
        }
      })
      const productosConflicto: NoStockProductosCarroDto = new NoStockProductosCarroDto()
      productosConflicto.productosEnConflicto = []
      contenidoCarroDto.productosCarro.forEach(productoCarro => {
        const producto: Producto = productos.find(producto => producto.id == productoCarro.productoId)
        if (producto.stock < productoCarro.cantidadProducto) {
          productoCarro.cantidadProducto = producto.stock
          productosConflicto.productosEnConflicto.push(productoCarro)
        }
      })
      if (productosConflicto.productosEnConflicto.length > 0) {
        throw new BadRequestException(productosConflicto)
      }
      else {
        return await this.replaceProductosCarro(idCarro, contenidoCarroDto)
      }
    }
    catch (error) {
      console.error(error)
      throw new BadRequestException(error)
    }
  }
}
