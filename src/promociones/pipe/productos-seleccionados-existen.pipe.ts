import { ArgumentMetadata, Inject, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ProductosService } from 'src/productos/service/productos.service';
import { UpdatePromocionDto } from '../dto/update_promocion.dto';
import { CreatePromocionDto } from '../dto/create_promocion.dto';

/**Valida que los productos seleccionados o modificados existan. Si la promoción es de tipo "TODOS", elimina los productos seleccinados o modificados del dto. */
@Injectable()
export class ProductosSeleccionadosPipe implements PipeTransform {

  constructor(@Inject(ProductosService) readonly productoService: ProductosService) { }

  async transform(value: any, metadata: ArgumentMetadata) {

    // Si el tipo de selección de productos es "TODOS" (idTipoSeleccionProductos: 1)
    // se remueven los productos seleccionados
    if (value.idTipoSeleccionProductos) {
      if (value.idTipoSeleccionProductos == 1) {
        delete value.productosModificados
        delete value.idsProductos
        return value
      }
    }

    let productosPorValidar: number[] = [];

    // Para validar los productos seleccionados en una promoción
    if ("idsProductos" in value) {
      const createDto: CreatePromocionDto = value as CreatePromocionDto
      productosPorValidar = productosPorValidar.concat(createDto.idsProductos)
    }
    if ("productosModificados" in value) {
      const updateDto: UpdatePromocionDto = value as UpdatePromocionDto
      if (updateDto.productosModificados.agregar) {
        productosPorValidar = productosPorValidar.concat(updateDto.productosModificados.agregar)
      }
      if (updateDto.productosModificados.remover) {
        productosPorValidar = productosPorValidar.concat(updateDto.productosModificados.remover)
      }
    }
    if (productosPorValidar) {
      await Promise.all(
        productosPorValidar.map(async (idProducto: number) => {
          const existe: boolean = await this.productoService.productoRepository.existsBy({
            id: idProducto,
          });
          if (!existe) {
            throw new NotFoundException(
              `No existe un producto asociado al id ${idProducto}.`,
            );
          }
        }),
      );
    }

    // if ("idsProductos" in value) {
    //   await Promise.all(
    //     value['idsProductos'].map(async (idProducto: number) => {
    //       const existe: boolean = await this.productoService.productoRepository.existsBy({
    //         id: idProducto,
    //       });
    //       if (!existe) {
    //         throw new NotFoundException(
    //           `No existe un producto asociado al id ${idProducto}.`,
    //         );
    //       }
    //     }),
    //   );
    // }
    // if ("productosModificados" in value) {
    //   if (value.idTipoSeleccionProductos) {
    //     if (value.idTipoSeleccionProductos == 1) return value
    //   }
    //   // Si el tipo de selección de productos es distinto a "TODOS" (idTipoSeleccionProductos: 1)
    //   await Promise.all(
    //     value['idsProductos'].map(async (idProducto: number) => {
    //       const existe: boolean = await this.productoService.productoRepository.existsBy({
    //         id: idProducto,
    //       });
    //       if (!existe) {
    //         throw new NotFoundException(
    //           `No existe un producto asociado al id ${idProducto}.`,
    //         );
    //       }
    //     }),
    //   );
    // }
    return value;
  }
}
