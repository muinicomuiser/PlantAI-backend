import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsBoolean, IsNotEmpty } from "class-validator";
import { PaginacionDto } from "src/productos/dto/catalogo/paginacion.dto";
import { GetPromocionDto } from "./get_promocion.dto";

export class FiltrosPromocionesDto extends PaginacionDto {
    @ApiProperty({
        description: 'ID del tipo de promoción',
        required: false,
        example: 1
    })
    @Transform(({ value }) => parseInt(value))
    @IsInt({ message: 'El ID del tipo de promoción debe ser un número entero' })
    @IsOptional()
    idTipoPromocion?: number;

    @ApiProperty({
        description: 'ID del tipo de descuento',
        required: false,
        example: 1
    })
    @Transform(({ value }) => parseInt(value))
    @IsInt({ message: 'El ID del tipo de descuento debe ser un número entero' })
    @IsOptional()
    idTipoDescuento?: number;

    @ApiProperty({
        description: 'ID del tipo de selección',
        required: false,
        example: 1
    })
    @Transform(({ value }) => parseInt(value))
    @IsInt({ message: 'El ID del tipo de selección debe ser un número entero' })
    @IsOptional()
    idTipoSeleccionProductos?: number;

    @ApiProperty({
        description: 'Indica si la promoción está habilitada',
        required: false,
        example: true
    })
    @Transform(({ value }) => {
        if (value === 'false' || value === '0') return false;
        if (value === 'true' || value === '1') return true;
        return Boolean(value);
    })
    @IsBoolean({ message: 'El campo habilitado debe ser un booleano' })
    @IsOptional()
    habilitado?: boolean;

    @ApiProperty({
        description: 'Fecha de inicio de la promoción',
        required: false,
        example: "2025-01-01"
    })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsNotEmpty()
    @IsOptional()
    fechaInicio?: Date;

    @ApiProperty({
        description: 'Fecha de término de la promoción',
        required: false,
        example: "2026-01-01"
    })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsNotEmpty()
    @IsOptional()
    fechaTermino?: Date;
}

export class GetPromocionesPaginadasDto {

    @ApiProperty()
    totalItems: number

    @ApiProperty({ type: [GetPromocionDto] })
    data: GetPromocionDto[]
}