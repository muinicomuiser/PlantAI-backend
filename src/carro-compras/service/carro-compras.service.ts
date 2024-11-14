import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroCompra } from '../entities/carro.entity';
import { IsNull, Repository } from 'typeorm';
import { PRODUCTO_RELATIONS } from 'src/productos/shared/constants/producto-relaciones';
import { CarroComprasMapper } from '../mapper/carro-compras.mapper';
import {
  CARRO_PRODUCTOS_RELATIONS,
  CARRO_RELATIONS,
} from '../shared/constants/carro-relaciones';
import { AddProductCarro } from '../dto/add-product-carro';
import { Producto } from 'src/productos/entities/producto.entity';
import { CarroProducto } from '../entities/carro_producto.entity';
import { UpdateProductCarro } from '../dto/update-product-carro';

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

  //Implementar para usuario administrador
  async createCarro(idUsuario: number) /* : Promise<GetCarroComprasDto> */ {
    const nuevoCarro = new CarroCompra(idUsuario);
    const carroGuardado = await this.carroComprasRepository.save(nuevoCarro);
    return true;
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
    //verificar stock disponible
    const stockProducto = await this.productoRepository.findOne({
      where: {
        id: addProductDto.productoId,
      },
    });

    if (
      !stockProducto ||
      stockProducto.cantidad < addProductDto.cantidadProducto
    ) {
      throw new BadRequestException('Stock insuficiente');
    }

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

    return CarroComprasMapper.carroProductoEntityToDto(carroProductGuardado);
  }

  async updateProductQuantity(idCarro: number, updateDto: UpdateProductCarro) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: updateDto.productoId,
      },
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en el carro');
    }
    //verificar stock disponible
    const stockProducto = await this.productoRepository.findOne({
      where: {
        id: updateDto.productoId,
      },
    });

    if (!stockProducto || stockProducto.cantidad < updateDto.cantidadProducto) {
      throw new BadRequestException('Stock insuficiente');
    }

    carroProducto.cantidadProducto = updateDto.cantidadProducto;
    await this.carroProductoRepository.save(carroProducto);
    return updateDto;
  }

  async removeProductCarro(idCarro: number, idProducto: number) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: idProducto,
      },
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en carrito');
    }

    await this.carroProductoRepository.remove(carroProducto);
    return true;
  }

  //Implementar para usuario administrador
  async deleteCarro(idCarro: number) {
    // const carroProducto = await this.carroProductoRepository.find({
    //   where: {
    //     idCarro: idCarro,
    //   },
    // });
    await this.carroComprasRepository.softDelete(idCarro);
    // await this.usuariosRepository.delete(id);
    return { message: `Carro con ID ${idCarro} eliminado con éxito` };
    // await this.carroProductoRepository.remove(carroProducto);

    // const carroEncontrado: CarroCompra =
    //   await this.carroComprasRepository.findOne({
    //     where: {
    //       id: idCarro,
    //     },
    //   });

    // await this.carroComprasRepository.remove(carroEncontrado);
    // return true;
  }
}
