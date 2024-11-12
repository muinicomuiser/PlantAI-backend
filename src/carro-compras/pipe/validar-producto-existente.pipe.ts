import {
    ArgumentMetadata,
    Injectable,
    NotFoundException,
    PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoExistentePipe implements PipeTransform {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const existe: boolean = await this.productoRepository.existsBy({ id: value });

        if (!existe) {
            throw new NotFoundException('No existe el producto');
        }
        return value;
    }

}