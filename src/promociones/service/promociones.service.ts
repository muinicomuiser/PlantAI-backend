import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductoMapper } from 'src/productos/mapper/entity-to-dto-producto';
import { ProductosService } from 'src/productos/service/productos.service';
import { PROMOCIONES_RELATIONS } from 'src/promociones/shared/constant/promociones.relations';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreatePromocionDto } from '../dto/create_promocion.dto';
import { GetProductosPromocionDto } from '../dto/get_productos_en_promocion.dto';
import { GetPromocionDto } from '../dto/get_promocion.dto';
import { UpdatePromocionDto } from '../dto/update_promocion.dto';
import { Promocion } from '../entities/promocion.entity';
import { PromocionMapper } from '../mapper/promocion.mapper';

@Injectable()
export class PromocionesService {
    constructor(
        @InjectRepository(Promocion)
        private readonly promocionesRepository: Repository<Promocion>,
        @Inject(ProductosService)
        private readonly productosService: ProductosService
    ) { }

    /**
     * BÚSQUEDA
     */

    async findAll(): Promise<GetPromocionDto[]> {
        try {
            const promociones: Promocion[] = await this.promocionesRepository.find({
                relations: PROMOCIONES_RELATIONS
            })
            return PromocionMapper.entitiesToDtos(promociones)
        }
        catch (error) {
            throw new BadRequestException('Error al obtener promociones', { description: error.message })
        }
    }

    async findById(idPromocion: number): Promise<GetPromocionDto> {
        try {
            const promocion: Promocion = await this.promocionesRepository.findOne({
                where: {
                    id: idPromocion
                },
                relations: PROMOCIONES_RELATIONS
            })
            return PromocionMapper.entityToDto(promocion)
        }
        catch (error) {
            throw new BadRequestException('Error al obtener promoción', { description: error.message })
        }
    }

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

    /**Retorna los productos de una promoción según su id, con paginación */
    async findSelectedProducts(id: number, paginationDto: PaginacionDto): Promise<GetProductosPromocionDto> {
        try {
            const pagination: PaginacionDto = {
                page: paginationDto.page ? +paginationDto.page : 1,
                pageSize: paginationDto.pageSize ? +paginationDto.pageSize : 10,
            };
            const limit = pagination.pageSize;
            const offset = (pagination.page - 1) * limit;
            const queryBuilder = this.productosService.productoRepository
                .createQueryBuilder('producto')
                .innerJoinAndSelect('producto.categoria', 'categoria')
                .leftJoinAndSelect('producto.planta', 'planta')
                .leftJoinAndSelect('planta.entorno', 'entorno')
                .leftJoinAndSelect('producto.imagenes', 'imagenes')
                .leftJoinAndSelect('planta.iluminacion', 'iluminacion')
                .leftJoinAndSelect('planta.tipoRiego', 'tipoRiego')
                .leftJoinAndSelect(
                    'planta.toleranciaTemperatura',
                    'toleranciaTemperatura',
                )
                .leftJoinAndSelect('planta.color', 'color')
                .leftJoinAndSelect('planta.fotoPeriodo', 'fotoPeriodo')
                .leftJoinAndSelect('planta.habitoCrecimiento', 'habitoCrecimiento')
                .leftJoinAndSelect('planta.tamano', 'tamano')
                .leftJoin('producto.promociones', 'promociones')
                .where('producto.habilitado = :habilitado', { habilitado: true })
                .andWhere('producto.idCategoria = :idCategoria', { idCategoria: 1 })
                .andWhere('promociones.id = :idPromocion', { idPromocion: id });

            queryBuilder.skip(offset).take(limit);

            const [result, totalItems] = await queryBuilder.getManyAndCount();

            return {
                id,
                totalItems: totalItems,
                data: ProductoMapper.entitiesToDtos(result)
            }
        }
        catch (error) {
            throw new BadRequestException('Error al obtener productos', { description: error.message })
        }
    }

    /**
     * CREACIÓN
     */

    async create(createPromocionDto: CreatePromocionDto): Promise<GetPromocionDto> {
        try {
            const nuevaPromocion: Promocion = Object.assign(new Promocion(), createPromocionDto);

            // Agregar productos seleccionados si el tipo de selección no es TODOS (id: 1)
            const promocionCreada: Promocion = await this.promocionesRepository.save(nuevaPromocion)
            if (createPromocionDto.idTipoSeleccionProductos != 1) {
                const productos = createPromocionDto.idsProductos.map(idProducto => {
                    return { id: idProducto }
                })
                promocionCreada.productos = productos as Producto[]
                await this.promocionesRepository.save(promocionCreada)
            }
            return this.findById(promocionCreada.id)
        }
        catch (error) {
            throw new BadRequestException('Error al crear promoción', { description: error.message })
        }
    }

    /**
     * Modificación
     */

    async update(id: number, updatePromocionDto: UpdatePromocionDto): Promise<GetPromocionDto> {
        try {
            const promocion: Promocion = await this.promocionesRepository.findOne({
                where: {
                    id: id
                },
                relations: ['productos']
            })
            if (updatePromocionDto.productosModificados) {
                if (updatePromocionDto.productosModificados.agregar) {
                    const productosAgregados = updatePromocionDto.productosModificados.agregar.map(
                        idProducto => {
                            return { id: idProducto }
                        }
                    ) as Producto[]
                    if (!promocion.productos) promocion.productos = []
                    promocion.productos.push(...productosAgregados)
                };
                if (updatePromocionDto.productosModificados.remover) {
                    promocion.productos = promocion.productos.filter(producto => {
                        if (updatePromocionDto.productosModificados.remover.findIndex(id => id == producto.id) < 0) {
                            return producto
                        }
                    })
                };
            }
            await this.promocionesRepository.save(Object.assign(promocion, updatePromocionDto))
            return this.findById(id)
        }
        catch (error) {
            throw new BadRequestException('Error al modificar promoción', { description: error.message })
        }
    }

    /**
     * ELIMINACIÓN
     */

    async deleteById(idPromocion: number): Promise<void> {
        try {
            const promocion: Promocion = await this.promocionesRepository.findOne({
                where: {
                    id: idPromocion
                },
                relations: ['productos']
            })
            promocion.productos = []
            await this.promocionesRepository.save(promocion)
            await this.promocionesRepository.remove(promocion)
            return
        }
        catch (error) {
            throw new BadRequestException('Error al eliminar promoción', { description: error.message })
        }
    }
}


