import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CarroCompra } from '../entities/carro.entity';

/**Valida la existencia de un carro por su id. */
@Injectable()
export class ValidarCarroActivoPipe implements PipeTransform {
  constructor(
    @InjectRepository(CarroCompra)
    private readonly carroRepository: Repository<CarroCompra>,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const carroEncontrado: boolean =
      await this.carroRepository.existsBy({
        idUsuario: value,
        fecha_cierre: IsNull(),
      })

    if (carroEncontrado) {
      throw new BadRequestException('No puede tener más de un carro activo')
    }
    return value;
  }
}
