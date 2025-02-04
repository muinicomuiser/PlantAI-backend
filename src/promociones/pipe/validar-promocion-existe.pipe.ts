import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocion } from '../entities/promocion.entity';
import { Repository } from 'typeorm';

/**Valida que una promoción exista */
@Injectable()
export class ValidarPromocionExistePipe implements PipeTransform {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionesRepository: Repository<Promocion>
  ) { }
  async transform(value: any, metadata: ArgumentMetadata) {

    const existe: boolean = await this.promocionesRepository.existsBy({ id: value })
    if (!existe) {
      throw new NotFoundException('No exite una promoción con ese id')
    }
    return value;
  }
}
