import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';

@Injectable()
export class MedioPagoExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(MedioPago)
    private readonly medioPagoRepository: Repository<MedioPago>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const medioPago = await this.medioPagoRepository.findOne({
      where: { id: value },
    });

    if (!medioPago) {
      throw new NotFoundException(`Medio de pago con ID ${value} no existe`);
    }

    return medioPago;
  }
}
