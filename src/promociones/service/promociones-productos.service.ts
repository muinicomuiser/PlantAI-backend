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
}
