import { ApiProperty } from "@nestjs/swagger";
import { GetProductoDto } from "src/productos/dto/producto/get-producto.dto";

export class GetCarroProductoDto {

    @ApiProperty()
    producto: GetProductoDto;

    @ApiProperty({ example: 5 })
    cantidadProducto: number;
}
