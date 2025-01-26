import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";


class ProductosPromocionModificados {
    @ApiProperty({
        description: 'Ids de productos que se agregarán a la promoción',
        example: [4, 5, 6]
    })
    agregar?: number[]

    @ApiProperty({
        description: 'Ids de productos que se removerán a la promoción',
        example: [2, 3]
    })
    remover?: number[]
}

export class UpdatePromocionDto {
    @ApiProperty({
        description: 'Nombre de la promoción',
        example: 'Cupón Cotiledón 2025',
        maxLength: 50,
        required: false
    })
    nombre?: string;

    @ApiProperty({
        description: 'Descripción de la promoción',
        example: 'Cupón de descuento para los miembros del equipo Cotiledón',
        maxLength: 256,
        required: false
    })
    descripcion?: string;

    @ApiProperty({
        description: 'Valor del descuento. Porcentaje o precio final, dependiendo del tipo de descuento',
        example: 20,
        required: false
    })
    valor?: number;

    @ApiProperty({
        description: 'Código requerido para activar una promoción de tipo CUPON',
        example: 'cotiledon2025',
        required: false,
        maxLength: 20
    })
    @Transform(({ value }) => value.trim().replaceAll(' ', ''), { toClassOnly: true })
    codigo?: string;

    @ApiProperty({
        description: 'Describe si una promoción puede ser aplicada. Por defecto es TRUE',
        example: true,
        default: true,
        required: false
    })
    habilitado?: boolean = true;

    @ApiProperty({
        description: 'Fecha desde que la promoción es aplicable',
        example: '2025-01-01',
        required: false
    })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    fechaInicio?: Date;

    @ApiProperty({
        description: 'Fecha cuando la promoción deja de ser aplicable',
        example: '2026-01-01',
        required: false
    })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    fechaTermino?: Date;

    @ApiProperty({
        description: 'Identificador del tipo de promoción',
        example: 1,
        required: false
    })
    idTipoPromocion?: number;

    /**1: PORCENTAJE, 2: FIJO */
    @ApiProperty({
        description: 'Identificador del tipo de descuento que aplica la promoción',
        example: 1,
        required: false
    })
    idTipoDescuento?: number;

    @ApiProperty({
        description: 'Identificador del tipo de selección de productos para la promoción',
        example: 1,
        required: false
    })
    idTipoSeleccionProductos?: number;

    @ApiProperty({
        description: 'Ids de los productos seleccionados en la promoción',
        type: ProductosPromocionModificados,
        required: false
    })
    productosModificados?: ProductosPromocionModificados;

}
