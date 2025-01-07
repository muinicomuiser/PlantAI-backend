import { ApiProperty } from '@nestjs/swagger';
import { GetProductoDto } from './get-producto.dto';



export class GetProductosAdminDto {

    @ApiProperty({ type: [GetProductoDto] })
    data: GetProductoDto[]

    @ApiProperty()
    totalItems: number
}