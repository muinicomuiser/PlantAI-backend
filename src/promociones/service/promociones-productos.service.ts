import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Promocion } from '../entities/promocion.entity';
import { PROMOCIONES_RELATIONS } from '../shared/constant/promociones.relations';

/**Service encargado de obtener las promociones para cada producto. */
@Injectable()
export class PromocionesProductosService {
    constructor(
        @InjectRepository(Promocion)
        private readonly promocionesRepository: Repository<Promocion>,
    ) { }
    /**Retorna un arreglo de promociones vigentes para un producto. */
    async findActivesByProductId(idProduct: number): Promise<Promocion[]> {
        try {
            const dateNow: Date = new Date()
            const promociones: Promocion[] = await this.promocionesRepository.find({
                where: [{
                    productos: {
                        id: idProduct
                    },
                    fechaInicio: LessThanOrEqual(dateNow),
                    fechaTermino: MoreThanOrEqual(dateNow),
                    habilitado: true
                }, {
                    idTipoSeleccionProductos: 1,
                    fechaInicio: LessThanOrEqual(dateNow),
                    fechaTermino: MoreThanOrEqual(dateNow),
                    habilitado: true
                }],
                relations: PROMOCIONES_RELATIONS
            })
            return promociones;
        }
        catch (error) {
            throw new BadRequestException('Error al obtener promociones', { description: error.message })
        }
    }

    /**Retorna un arreglo con todas las promociones tipo CUPON y la mejor promoción de tipo TRADICIONAL del producto.*/
    filtrarPromocionesDestacadas(promociones: Promocion[], precioProducto: number): Promocion[] {
        // Primero agregar todas las de tipo CUPON
        const destacadas: Promocion[] = promociones.filter(promocion => promocion.idTipoPromocion == 2);


        // Filtrar promociones tradicionales según el mayor descuento o el precio menor
        let tradicionales: Promocion[] = promociones.filter(promocion => promocion.idTipoPromocion == 1)
        if (tradicionales) {
            let mejorPromocion: Promocion = tradicionales[1]
            if (tradicionales.length > 1) {
                let precioFinal: number = precioProducto;
                promociones.forEach(promocion => {
                    // Si es porcentaje
                    if (promocion.idTipoDescuento == 1) {
                        const precioDescuento: number = (1 - (promocion.valor / 100)) * precioProducto;
                        if (precioDescuento < precioFinal) {
                            mejorPromocion = promocion;
                            precioFinal = precioDescuento;
                        }
                    }
                    // Si es precio fijo
                    else if (promocion.idTipoDescuento == 2) {
                        if (promocion.valor < precioFinal) {
                            mejorPromocion = promocion;
                            precioFinal = promocion.valor;
                        }
                    }
                })
            }
            destacadas.push(mejorPromocion);
        }
        return destacadas;
    }
}
