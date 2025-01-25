import { ApiProperty } from "@nestjs/swagger";
import { GetProductoDto } from "src/productos/dto/producto/get-producto.dto";

export class GetProductosPromocionDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    totalItems: number;
    @ApiProperty({
        type: [GetProductoDto]
    })
    data: GetProductoDto[]
}