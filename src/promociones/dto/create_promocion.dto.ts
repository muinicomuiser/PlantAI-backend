import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString } from "class-validator";

export class CreatePromocionDto {
    @ApiProperty({
        description: 'Nombre de la promoción',
        example: 'Cupón Cotiledón 2025',
        maxLength: 50
    })
    nombre: string;

    @ApiProperty({
        description: 'Descripción de la promoción',
        example: 'Cupón de descuento para los miembros del equipo Cotiledón',
        maxLength: 256
    })
    descripcion: string;

    @ApiProperty({
        description: 'Valor del descuento. Porcentaje o precio final, dependiendo del tipo de descuento',
        example: 20
    })
    valor: number;

    @ApiProperty({
        description: 'Código requerido para activar una promoción de tipo CUPON',
        example: 'cotiledon2025',
        required: false,
        maxLength: 20
    })
    codigo?: string;

    @ApiProperty({
        description: 'Describe si una promoción puede ser aplicada. Por defecto es TRUE',
        example: true,
        default: true,
        required: false
    })
    habilitado: boolean = true;

    @ApiProperty({
        description: 'Fecha desde que la promoción es aplicable',
        example: '2025-01-01'
    })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    fechaInicio: Date;

    @ApiProperty({
        description: 'Fecha cuando la promoción deja de ser aplicable',
        example: '2026-01-01'
    })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    fechaTermino: Date;

    @ApiProperty({
        description: 'Identificador del tipo de promoción',
        example: 1
    })
    idTipoPromocion: number;

    @ApiProperty({
        description: 'Identificador del tipo de descuento que aplica la promoción',
        example: 1
    })
    idTipoDescuento: number;

    @ApiProperty({
        description: 'Identificador del tipo de selección de productos para la promoción',
        example: 1
    })
    idTipoSeleccionProductos: number;

    @ApiProperty({
        description: 'Ids de los productos seleccionados en la promoción',
        example: [1, 2, 3],
        required: false
    })
    idsProductos?: number[]

}