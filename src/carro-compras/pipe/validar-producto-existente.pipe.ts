import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';
import { UpdateContenidoCarroDto } from '../dto/update-carro-compra.dto';
import { UpdateProductCarro } from '../dto/update-product-carro';

/**Valida si un producto existe según su id. Comprueba en params numéricos y en objetos tipo UpdateContenidoCarroDto | UpdateProductCarro.*/
@Injectable()
export class ProductoExistentePipe<T extends Number | UpdateContenidoCarroDto | UpdateProductCarro> implements PipeTransform {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>) { }

  async transform(value: any, metadata: ArgumentMetadata): Promise<T> {
    if (typeof value === 'number') {
      const existe: boolean = await this.productoRepository.existsBy({
        id: value,
      });
      if (!existe) {
        throw new NotFoundException('No existe un producto asociado a ese id.');
      }
    }
    if (typeof value == 'object') {
      if ('productosCarro' in value) {
        await Promise.all(value['productosCarro'].map(async productoCarro => {
          const existe: boolean = await this.productoRepository.existsBy({
            id: productoCarro.productoId
          });
          if (!existe) {
            throw new NotFoundException(`No existe un producto asociado al id ${productoCarro.productoId}.`);
          }

        }))
      }
      else if ('productoId' in value) {
        const existe: boolean = await this.productoRepository.existsBy({
          id: value.productoId,
        });
        if (!existe) {
          throw new NotFoundException('No existe un producto asociado a ese id.');
        }
      }
    }
    return value;
  }
}
