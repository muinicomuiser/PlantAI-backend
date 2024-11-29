import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ValidarImagenProductoExistePipe implements PipeTransform {
  constructor(@InjectRepository(Producto) private readonly productoRepository: Repository<Producto>) { }
  async transform(value: any, metadata: ArgumentMetadata) {
    const imagenExiste: boolean = await this.productoRepository.existsBy({
      id: value,
      imagen: Not(null)
    })
    if (!imagenExiste) {
      throw new NotFoundException('El producto no tiene imagen')
    }
    return value;
  }
}
