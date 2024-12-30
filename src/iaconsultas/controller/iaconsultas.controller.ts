import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';
import { ConsultaBinario } from '../dto/consulta-binario.dto';
import { GetFiltrosIaDto } from '../dto/get-filtros-ia.dto';
import { ValidarConsultaBase64Pipe } from '../pipe/validar-consulta-base64.pipe';
import { ValidarConsultaBinarioPipe } from '../pipe/validar-consulta-binario.pipe';
import { BodyBinario } from '../routehandler/routehandler-body-binario';
import { IaconsultasService } from '../service/iaconsultas.service';
import { DescripcionDocumentacionIA } from '../constants/descripcion-documentacion-ia';


/**Cómo funciona:
 * Tiene dos endpoints, uno para recibir imágenes en formato base64 y otro en formato binario.
 * Hace una consulta a partir de una imagen y texto a la API de Google Cloud, usando el servicio Generative Language API.
 * A partir de los datos de entrada, la IA selecciona un conjunto de atributos asociados al producto tipo Planta.
 * La selección la hace considerando los atributos que debería tener una planta para la consulta entrante.
 * Ambos endpoints retornan el conjunto de atributos seleccionados para que puedan ser usados en consultas al endpoint de catálogo.
 * En resumen, la idea es que la IA seleccione filtros para buscar plantas que se ajusten a la consulta en el catálogo, y que esos 
 * filtros se almacenen en cada dispositivo, para no perderlos al hacer cambios en la paginación.
 */
@ApiTags('IAConsultas')
@Controller('iaconsultas')
export class IaconsultasController {

    constructor(private readonly iaconsultasService: IaconsultasService) { }

    @ApiOperation({
        summary: "Obtener filtros para catálogo en base a consulta con imagen en binario y texto",
        description: DescripcionDocumentacionIA
    })
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
        status: 200, description: 'Retorna filtros para catálogo que coincidan con la consulta',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Razones que da la IA para elegir los filtros' },
                data: {
                    $ref: getSchemaPath(GetFiltrosIaDto)
                },
            }
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Error en la consulta'
    })
    @Post('binario')
    @UseInterceptors(FileInterceptor('archivo'))
    async consultaBinario(
        @BodyBinario(ValidarConsultaBinarioPipe) consulta: ConsultaBinario
    ): Promise<GetDataDto<GetFiltrosIaDto>> {
        return await this.iaconsultasService.getRespuestaBinario(consulta)
    };


    @ApiOperation({
        summary: "Obtener filtros para catálogo en base a consulta con imagen en base64 y texto",
        description: DescripcionDocumentacionIA
    })
    @ApiExtraModels(
        GetFiltrosIaDto,
    )
    @ApiResponse({
        status: 200, description: 'Retorna filtros para catálogo que coincidan con la consulta',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Razones que da la IA para elegir los filtros' },
                data: {
                    $ref: getSchemaPath(GetFiltrosIaDto)
                },
            }
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Error en la consulta'
    })
    @ApiBody({ type: ConsultaBase64Dto })
    @Post('base')
    async consultaBase64(
        @Body(ValidarConsultaBase64Pipe) consultaDto: ConsultaBase64Dto
    ): Promise<GetDataDto<GetFiltrosIaDto>> {
        return await this.iaconsultasService.getRespuestaBase64(consultaDto)
    };
};
