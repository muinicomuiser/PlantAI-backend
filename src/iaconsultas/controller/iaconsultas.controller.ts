import { Body, Controller, Post, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';
import { ConsultaBinario } from '../dto/consulta-binario.dto';
import { ValidarConsultaBinarioPipe } from '../pipe/validar-consulta-binario.pipe';
import { BodyBinario } from '../routehandler/routehandler-body-binario';
import { IaconsultasService } from '../service/iaconsultas.service';
import { ValidarConsultaBase64Pipe } from '../pipe/validar-consulta-base64.pipe';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { GetFiltrosIaDto } from '../dto/get-filtros-ia.dto';

/**Conversar con front y mobile sobre el tipo de respuesta */ // <---------------------
@ApiTags('IAConsultas')
@Controller('iaconsultas')
export class IaconsultasController {

    constructor(private readonly iaconsultasService: IaconsultasService) { }

    @ApiOperation({ summary: "Obtener filtros para catálogo en base a consulta con imagen en binario y texto" })
    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(
        ConsultaBinario,
    )
    @ApiBody({
        schema: {
            $ref: getSchemaPath(ConsultaBinario),
        },
        required: false
    })
    @ApiResponse({
        status: 200, description: 'Retorna filtros para catálogo que coincidan con la consulta', schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Razones que da la IA para elegir los filtros' },
                data: {
                    $ref: getSchemaPath(GetFiltrosIaDto)
                },
            }
        },
    })
    @ApiResponse({ status: 400, description: 'Error en la consulta' })
    @Post('binario')
    @UseInterceptors(FileInterceptor('archivo'))
    async consultaBinario(@BodyBinario(ValidarConsultaBinarioPipe) consulta: ConsultaBinario): Promise<GetDataDto<GetFiltrosIaDto>> {
        return await this.iaconsultasService.getRespuestaBinario(consulta)
    }


    @ApiOperation({ summary: "Obtener filtros para catálogo en base a consulta con imagen en base64 y texto" })
    @ApiExtraModels(
        GetFiltrosIaDto,
    )
    @ApiResponse({
        status: 200, description: 'Retorna filtros para catálogo que coincidan con la consulta', schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Razones que da la IA para elegir los filtros' },
                data: {
                    $ref: getSchemaPath(GetFiltrosIaDto)
                },
            }
        },
    })
    @ApiResponse({ status: 400, description: 'Error en la consulta' })
    @ApiBody({ type: ConsultaBase64Dto })
    @Post('base')
    async consultaBase64(@Body(ValidarConsultaBase64Pipe) consultaDto: ConsultaBase64Dto): Promise<GetDataDto<GetFiltrosIaDto>> {
        return await this.iaconsultasService.getRespuestaBase64(consultaDto)
    }

}
