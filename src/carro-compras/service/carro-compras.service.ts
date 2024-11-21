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
import { UpdateProductCarro } from '../dto/update-product-carro';
import { CarroCompra } from '../entities/carro.entity';
import { CarroProducto } from '../entities/carro_producto.entity';
import { CarroComprasMapper } from '../mapper/carro-compras.mapper';
import { CARRO_PRODUCTOS_RELATIONS } from '../shared/constants/carro-productos-relaciones';
import {
  CARRO_RELATIONS,
} from '../shared/constants/carro-relaciones';
import { UpdateContenidoCarroDto } from '../dto/update-carro-compra.dto';

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
      relations: [...PRODUCTO_RELATIONS]
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
    carroProductGuardado.producto = stockProducto
    return CarroComprasMapper.carroProductoEntityToDto(carroProductGuardado);
  }

  async updateProductQuantity(idCarro: number, updateDto: UpdateProductCarro) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: updateDto.productoId,
      },
      relations: [...CARRO_PRODUCTOS_RELATIONS]
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en el carro');
    }
    //verificar stock disponible
    const stockProducto = await this.productoRepository.findOne({
      where: {
        id: updateDto.productoId,
      },
      relations: [...PRODUCTO_RELATIONS]
    });

    if (!stockProducto || stockProducto.cantidad < updateDto.cantidadProducto) {
      throw new BadRequestException('Stock insuficiente');
    }
    carroProducto.cantidadProducto = updateDto.cantidadProducto;
    const carroProductoActualizado = await this.carroProductoRepository.save(carroProducto);
    carroProductoActualizado.producto = stockProducto
    return CarroComprasMapper.carroProductoEntityToDto(carroProductoActualizado)
    // return updateDto;
  }

  async removeProductCarro(idCarro: number, idProducto: number) {
    const carroProducto = await this.carroProductoRepository.findOne({
      where: {
        idCarro: idCarro,
        idProducto: idProducto,
      },
    });

    if (!carroProducto) {
      throw new NotFoundException('Producto no encontrado en carro');
    }

    await this.carroProductoRepository.remove(carroProducto);
    return true;
  }

  //Implementar para usuario administrador
  async deleteCarro(idCarro: number) {
    await this.carroComprasRepository.softDelete(idCarro);
    return { message: `Carro con ID ${idCarro} eliminado con éxito` };
  }

  async replaceProductosCarro(idCarro: number, updateCarroDto: UpdateContenidoCarroDto): Promise<GetCarroProductoDto[]> {
    const idsProductos: number[] = updateCarroDto.productosCarro.map(pc => pc.productoId)
    const productosEncontrados: Producto[] = await this.productoRepository.find({
      relations: [...PRODUCTO_RELATIONS],
      where: {
        id: In(idsProductos)
      }
    })
    await this.carroProductoRepository.delete({
      idCarro: idCarro
    })
    const nuevosCarroProductos: CarroProducto[] = []
    updateCarroDto.productosCarro.forEach(productoCarro => {
      const nuevoCarroProducto: CarroProducto = new CarroProducto()
      nuevoCarroProducto.idCarro = idCarro
      nuevoCarroProducto.idProducto = productoCarro.productoId
      nuevoCarroProducto.cantidadProducto = productoCarro.cantidadProducto
      nuevosCarroProductos.push(nuevoCarroProducto)
    })
    console.log(nuevosCarroProductos)
    await this.carroProductoRepository.save(nuevosCarroProductos);

    nuevosCarroProductos.forEach(carroProducto => {
      carroProducto.producto = productosEncontrados.find(producto => producto.id == carroProducto.idProducto)
    })
    return CarroComprasMapper.arrayCarroProductosEntityToDto(nuevosCarroProductos)
    // nuevoCarroProducto.producto = productos.find(prod => prod.id == productoCarro.productoId)
  }
}
