import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreatePromocionDto } from '../dto/create_promocion.dto';
import { Promocion } from '../entities/promocion.entity';
import { TipoDescuento } from '../entities/tipo_descuento.entity';
import { TipoPromocion } from '../entities/tipo_promocion.entity';
import { TipoSeleccionProducto } from '../entities/tipo_seleccion_producto.entity';

/**Valida las propiedades del dto al crear una promoción. 
 * Se valida que los tipos de promociones existan, que se defina un código para un cupón, 
 * que no haya promociones activas con los mismos nombres o códigos 
 * y que el porcentaje de descuento no sea mayor a 100%*/
@Injectable()
export class ValidarCrearPromocionPipe implements PipeTransform {
  constructor(
    @InjectRepository(TipoDescuento) readonly tipoDescuentoRepository: Repository<TipoDescuento>,
    @InjectRepository(TipoPromocion) readonly tipoPromocionRepository: Repository<TipoPromocion>,
    @InjectRepository(TipoSeleccionProducto) readonly tipoSeleccionProductoRepository: Repository<TipoSeleccionProducto>,
    @InjectRepository(Promocion) readonly promocionRepository: Repository<Promocion>,
  ) { }
  async transform(value: any, metadata: ArgumentMetadata) {

    // Asumir que el código entrante es de tipo CreatePromocionDto
    const promocionDto: CreatePromocionDto = value as CreatePromocionDto;

    // Comprobar que los tipos seleccionados existan
    const tipoDescuentoExiste: boolean = await this.tipoDescuentoRepository.existsBy({ id: promocionDto.idTipoDescuento });
    if (!tipoDescuentoExiste) {
      throw new NotFoundException('No existe un tipo de descuento asociado a ese idTipoDescuento')
    }
    const tipoPromocionExiste: boolean = await this.tipoPromocionRepository.existsBy({ id: promocionDto.idTipoPromocion })
    if (!tipoPromocionExiste) {
      throw new NotFoundException('No existe un tipo de promoción asociado a ese idTipoPromocion')
    }
    const tipoSeleccionExiste: boolean = await this.tipoSeleccionProductoRepository.existsBy({ id: promocionDto.idTipoSeleccionProductos })
    if (!tipoSeleccionExiste) {
      throw new NotFoundException('No existe un tipo de selección de productos asociado a ese idTipoSeleccionProductos')
    }

    // Verificar que si el tipo de descuento es Porcentaje, el valor a descontar no sea mayor al 100%
    if (promocionDto.idTipoDescuento == 1 && promocionDto.valor > 100) {
      throw new BadRequestException('El valor de un descuento tipo PORCENTAJE no puede ser mayor a 100')
    }

    // Comprobar que, si el tipo de promoción es CUPON, se adjunte un código de validación
    if (promocionDto.idTipoPromocion == 2 && !promocionDto.codigo) {
      throw new BadRequestException('Se debe definir un código de validación para el cupón')
    }

    // Comprobar que no haya un cupón activo con el mismo código
    if (promocionDto.codigo) {
      const dateNow: Date = new Date()
      const codigoExiste: boolean = await this.promocionRepository.exists({
        where: {
          codigo: promocionDto.codigo.trim().replaceAll(' ', ''),
          fechaInicio: LessThanOrEqual(dateNow),
          fechaTermino: MoreThanOrEqual(dateNow),
          habilitado: true,
          idTipoPromocion: 2
        }
      })
      if (codigoExiste) {
        throw new BadRequestException(`Ya existe un cupón activo con el código "${promocionDto.codigo}"`)
      }
    }

    // Comprobar que no haya una promoción activa con el mismo nombre
    const dateNow: Date = new Date()
    const nombreExiste: boolean = await this.promocionRepository.exists({
      where: {
        nombre: promocionDto.nombre,
        fechaInicio: LessThanOrEqual(dateNow),
        fechaTermino: MoreThanOrEqual(dateNow),
        habilitado: true,
      }
    })
    if (nombreExiste) {
      throw new BadRequestException(`Ya existe una promoción activa con el nombre "${promocionDto.nombre}"`)
    }
    return value;
  }
}
