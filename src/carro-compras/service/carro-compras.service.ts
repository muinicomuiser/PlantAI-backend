import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroCompra } from '../entities/carro.entity';
import { IsNull, Repository } from 'typeorm';
import { PRODUCTO_RELATIONS } from 'src/productos/shared/constants/producto-relaciones';
import { CarroComprasMapper } from '../mapper/carro-compras.mapper';
import { CARRO_PRODUCTO_RELATIONS } from '../shared/constants/carro-relaciones';
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
    private readonly carroProductoRepository: Repository<CarroProducto>
  ) { }

  createCarro(carro: CreateCarroCompraDto): GetCarroComprasDto {
    return null;
  }

  /**Retorna un DTO de carro de compras según su id. */
  async findByCarroId(id: number): Promise<GetCarroComprasDto> {
    const carroEncontrado: CarroCompra =
      await this.carroComprasRepository.findOne({
        where: {
          id: id,
        },
        relations: ['carroProductos', ...CARRO_PRODUCTO_RELATIONS],
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
        relations: ['carroProductos', ...CARRO_PRODUCTO_RELATIONS],
      });
    if (!carroEncontrado) {
      const carroNuevo: CarroCompra = new CarroCompra(id);
      this.carroComprasRepository.save(carroNuevo);
      return await this.findByUserId(id); /**Aguante la recursividad*/
    }
    return CarroComprasMapper.carroEntityToDto(carroEncontrado);
  }

  async addProductToCarro(idCarro: number, addProductDto: AddProductCarro) {
    //verificar stock disponible
    const stockProducto = await this.productoRepository.findOne({
      where: {
        id: addProductDto.productoId
      }
    });

    if (!stockProducto || stockProducto.cantidad < addProductDto.cantidadProducto) {
      throw new BadRequestException('Stock insuficiente');
    }

    //busca en el carro si ya existe un producto agregado
    let carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: addProductDto.productoId
      }
    });
    //si producto existe, aumenta cantidad
    if (carroProducto) {
      carroProducto.cantidadProducto += addProductDto.cantidadProducto;
    } else {
      carroProducto = await this.carroProductoRepository.create({
        idCarro: idCarro,
        idProducto: addProductDto.productoId,
        cantidadProducto: addProductDto.cantidadProducto,
      });
    };
    let carroProductGuardado = await this.carroProductoRepository.save(carroProducto);

    return carroProductGuardado;
  }

  async updateProductQuantity(idCarro: number, updateDto: UpdateProductCarro) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: updateDto.productoId,
      }
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en el carro');
    };

    carroProducto.cantidadProducto = updateDto.cantidadProducto;
    await this.carroProductoRepository.save(carroProducto)
    return true;;
  }

  async removeProductCarro(idCarro: number, idProducto: number) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: idProducto,
      }
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en carrito');
    };

    await this.carroProductoRepository.remove(carroProducto);
    return true;
  }
  deleteCarro(id: number): boolean {
    return true;
  }

  updateCarro(id: number, carro: UpdateCarroCompraDto): GetCarroComprasDto {
    return null;
  }
}
