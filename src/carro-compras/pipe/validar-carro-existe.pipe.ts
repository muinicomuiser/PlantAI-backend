import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarroCompra } from '../entities/carro.entity';

/**Valida la existencia de un carro por su id. */
@Injectable()
export class ValidarCarroExistePipe implements PipeTransform {

  constructor(@InjectRepository(CarroCompra) private readonly carroRepository: Repository<CarroCompra>) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const existe: boolean = await this.carroRepository.existsBy({ id: value })

    if (!existe) {
      throw new NotFoundException('No existe un carro con ese id.')
    }
    return value;
  }
}
