import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Producto } from '../entities/producto.entity';

// VALUES('Plantas'),
//   ('Accesorios'),
//   ('Macetero'),
//   ('Insumos');
/**Valida que el dto de crear y actualizar producto solo traiga las propiedades correspondientes a su id de categoría */
@Injectable()
export class ValidarCategoriaProductoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const producto = value as Producto;
    if (
      (producto.planta && producto.idCategoria != 1)
      || (producto.accesorio && producto.idCategoria != 2)
      || (producto.macetero && producto.idCategoria != 3)
      || (producto.insumo && producto.idCategoria != 4)) {
      throw new BadRequestException('Solo se debe llenar el dto de Categoría correspondiente al idCategoría. Planta: 1, Accesorio: 2, Macetero: 3, Insumo: 4')
    }
    return value;
  }
}
