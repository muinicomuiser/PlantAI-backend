import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Not, Repository } from 'typeorm';
import { PRODUCTO_RELATIONS } from '../shared/constants/producto-relaciones';

@Injectable()
export class ValidarImagenProductoExistePipe implements PipeTransform {
  constructor(@InjectRepository(Producto) private readonly productoRepository: Repository<Producto>) { }
  async transform(value: any, metadata: ArgumentMetadata) {
    const producto: Producto = await this.productoRepository.findOne({
      where: { id: value },
      relations: [...PRODUCTO_RELATIONS]
    })
    if (!producto.imagenes) {
      throw new NotFoundException('El producto no tiene imágenes')
    }
    return value;
  }
}
