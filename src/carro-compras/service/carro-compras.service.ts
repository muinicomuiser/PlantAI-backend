import { Injectable } from '@nestjs/common';
import { CreateCarroCompraDto } from '../dto/create-carro-compra.dto';
import { UpdateCarroCompraDto } from '../dto/update-carro-compra.dto';
import { GetCarroComprasDto } from '../dto/get-carro-compras.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroCompra } from '../entities/carro.entity';
import { IsNull, Repository } from 'typeorm';
import { PRODUCTO_RELATIONS } from 'src/productos/shared/constants/producto-relaciones';
import { CarroComprasMapper } from '../mapper/carro-compras.mapper';
import { CARRO_PRODUCTO_RELATIONS } from '../shared/constants/carro-relaciones';

@Injectable()
export class CarroComprasService {
  constructor(@InjectRepository(CarroCompra) private readonly carroComprasRepository: Repository<CarroCompra>) { }

  createCarro(carro: CreateCarroCompraDto): GetCarroComprasDto {
    return null;
  }

  /**Retorna un DTO de carro de compras según su id. */
  async findByCarroId(id: number): Promise<GetCarroComprasDto> {
    const carroEncontrado: CarroCompra = await this.carroComprasRepository.findOne({
      where: {
        id: id,
      },
      relations: ['carroProductos', ...CARRO_PRODUCTO_RELATIONS]
    });
    return CarroComprasMapper.carroEntityToDto(carroEncontrado);
  }

  /**Retorna un DTO del carro de compras activo de un usuario según su id. */
  async findByUserId(id: number): Promise<GetCarroComprasDto> {
    const carroEncontrado: CarroCompra = await this.carroComprasRepository.findOne({
      where: {
        idUsuario: id,
        fecha_cierre: IsNull()
      },
      relations: ['carroProductos', ...CARRO_PRODUCTO_RELATIONS]
    });
    if (!carroEncontrado) {
      const carroNuevo: CarroCompra = new CarroCompra(id);
      this.carroComprasRepository.save(carroNuevo)
      return await this.findByUserId(id)  /**Aguante la recursividad*/
    }
    return CarroComprasMapper.carroEntityToDto(carroEncontrado);
  }

  deleteCarro(id: number): boolean {
    return true;
  }

  updateCarro(id: number, carro: UpdateCarroCompraDto): GetCarroComprasDto {
    return null;
  }
}
