import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CarroCompra } from '../entities/carro.entity';
export declare class ValidarCarroExistePipe implements PipeTransform {
    private readonly carroRepository;
    constructor(carroRepository: Repository<CarroCompra>);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
