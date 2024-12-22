import { ApiProperty } from "@nestjs/swagger";

export class GetProductoPedidoDto {
    @ApiProperty()
    idProducto: number;
    @ApiProperty()
    cantidad: number;
    @ApiProperty()
    precioCompraUnidad: number;
}