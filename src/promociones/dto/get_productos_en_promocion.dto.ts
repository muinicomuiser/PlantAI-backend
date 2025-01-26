import { ApiProperty } from "@nestjs/swagger";
import { GetProductoDto } from "src/productos/dto/producto/get-producto.dto";

export class GetProductosPromocionDto {
    @ApiProperty({
        description: 'Id de la promoción'
    })
    id: number;
    @ApiProperty({
        required: false,
        description: 'Describe si la promoción se aplica a todos los productos'
    })
    todosSeleccionados?: boolean;
    @ApiProperty({
        required: false,
        description: 'Número de productos encontrados'
    })
    totalItems?: number;
    @ApiProperty({
        required: false,
        type: [GetProductoDto]
    })
    data?: GetProductoDto[]
}