import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { GetProductoDto } from './get-producto.dto';



export class GetProductosAdminDto {

    @ApiProperty({ type: [GetProductoDto] })
    data: GetProductoDto[]

    @ApiProperty()
    totalItems: number
}