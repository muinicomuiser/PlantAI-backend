import {
    ArgumentMetadata,
    Injectable,
    NotFoundException,
    PipeTransform
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';

/**Valida que el id de producto del dto entrante esté registrado.*/
@Injectable()
export class ValidarCrearReviewPipe implements PipeTransform {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const createReview: CreateReviewDto = value as CreateReviewDto
        const productoExiste: boolean = await this.productoRepository.existsBy({ id: createReview.idProducto })
        if (!productoExiste) {
            throw new NotFoundException(
                `No existe un producto con ID ${createReview.idProducto}`,
            );
        }
        return value;
    }
}