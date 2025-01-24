import { GetPromocionDto } from "../dto/get_promocion.dto";
import { GetPromocionProductoDto } from "../dto/get_promocion_producto.dto";
import { Promocion } from "../entities/promocion.entity";

export class PromocionMapper {

    /**Retorna un DTO de Promoción */
    static entityToDto(promocion: Promocion): GetPromocionDto {
        const dto: GetPromocionDto = {
            id: promocion.id,
            nombre: promocion.nombre,
            descripcion: promocion.descripcion,
            valor: promocion.valor,
            tipoDescuento: promocion.tipoDescuento.tipo,
            tipoPromocion: promocion.tipoPromocion.tipo,
            tipoSeleccionProductos: promocion.tipoSeleccionProducto.tipo,
            fechaInicio: promocion.fechaInicio,
            fechaTermino: promocion.fechaTermino,
            habilitado: promocion.habilitado
        }
        return dto;
    }

    /**Retorna un DTO de Promoción para ser agregada al Get Producto Dto */
    static entityToPromocionProductoDto(promocion: Promocion): GetPromocionProductoDto {
        const dto: GetPromocionProductoDto = {
            id: promocion.id,
            nombre: promocion.nombre,
            descripcion: promocion.descripcion,
            valor: promocion.valor,
            tipoDescuento: promocion.tipoDescuento.tipo,
            tipoPromocion: promocion.tipoPromocion.tipo,
            fechaInicio: promocion.fechaInicio,
            fechaTermino: promocion.fechaTermino,
        }
        return dto;
    }


    /**Retorna un arreglo de DTO de Promoción */
    static entitiesToDtos(promociones: Promocion[]): GetPromocionDto[] {
        return promociones.map(PromocionMapper.entityToDto);
    }


    /**Retorna un arreglo de DTO de Promoción para ser agregada al Get Producto Dto */
    static entitiesToPromocionProductoDtos(promociones: Promocion[]): GetPromocionProductoDto[] {
        return promociones.map(PromocionMapper.entityToPromocionProductoDto);
    }

}