import { ApiProperty } from '@nestjs/swagger';
import { GetProductoDto } from './get-producto.dto';



export class GetProductosPaginadosDto {

    @ApiProperty()
    totalItems: number

    @ApiProperty({ type: [GetProductoDto] })
    data: GetProductoDto[]
}