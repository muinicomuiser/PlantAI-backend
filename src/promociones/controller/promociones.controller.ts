import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPromocionDto } from '../dto/get_promocion.dto';
import { PromocionesService } from '../service/promociones.service';

@ApiTags('Promociones')
@Controller('promociones')
export class PromocionesController {
    constructor(private readonly promocionesService: PromocionesService) { }

    @ApiOperation({
        summary: 'Obtener todas las promociones activas'
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna todas las promociones activas',
        type: [GetPromocionDto]
    })
    @Get()
    async findAll(): Promise<GetPromocionDto[]> {
        return await this.promocionesService.findAll()
    }

    @ApiOperation({
        summary: 'Obtener promoción por id'
    })
    @ApiResponse({
        status: 200,
        description: 'Retorna una promoción según su id',
        type: GetPromocionDto
    })
    @ApiResponse({
        status: 404,
        description: 'No existe una promoción con ese id',
    })
    @Get(':id')
    async findById(@Param('id') id: number): Promise<GetPromocionDto> {
        return await this.promocionesService.findById(+id)
    }

}
