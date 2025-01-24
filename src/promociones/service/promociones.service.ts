import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PROMOCIONES_RELATIONS } from 'src/promociones/shared/constant/promociones.relations';
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { GetPromocionDto } from '../dto/get_promocion.dto';
import { Promocion } from '../entities/promocion.entity';
import { PromocionMapper } from '../mapper/promocion.mapper';

@Injectable()
export class PromocionesService {
    constructor(
        @InjectRepository(Promocion)
        private readonly promocionesRepository: Repository<Promocion>
    ) { }

    /**
     * BÚSQUEDA
     */

    async findAll(): Promise<GetPromocionDto[]> {
        const promociones: Promocion[] = await this.promocionesRepository.find({
            relations: PROMOCIONES_RELATIONS
        })
        return PromocionMapper.entitiesToDtos(promociones)
    }

    async findById(idPromocion: number): Promise<GetPromocionDto> {
        const promocion: Promocion = await this.promocionesRepository.findOne({
            where: {
                id: idPromocion
            },
            relations: PROMOCIONES_RELATIONS
        })
        return PromocionMapper.entityToDto(promocion)
    }

    /**Retorna un arreglo de promociones vigentes para un producto. */
    async findActivesByProductId(idProduct: number): Promise<Promocion[]> {
        const dateNow: Date = new Date()
        const promociones: Promocion[] = await this.promocionesRepository.find({
            where: [{
                productos: {
                    id: idProduct
                },
                fechaInicio: MoreThanOrEqual(dateNow),
                fechaTermino: LessThanOrEqual(dateNow),
                habilitado: true
            }, {
                idTipoSeleccionProductos: 1,
                fechaTermino: MoreThanOrEqual(dateNow),
                fechaInicio: LessThanOrEqual(dateNow),
                habilitado: true
            }],
            relations: PROMOCIONES_RELATIONS
        })
        return promociones;
    }
}


