import { Body, Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';
import { ConsultaBinario } from '../dto/consulta-binario.dto';
import { ValidarContenidoConsultaPipe } from '../pipe/validar-contenido-consulta.pipe';
import { IaconsultasService } from '../service/iaconsultas.service';

/**Conversar con front y mobile sobre el tipo de respuesta */ // <---------------------
@ApiTags('IAConsultas')
@Controller('iaconsultas')
export class IaconsultasController {

    constructor(private readonly iaconsultasService: IaconsultasService) { }

    @ApiOperation({ summary: "Obtener catálogo productos en base a consulta con imagen en binario y texto" })
    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(
        ConsultaBinario,
    )
    @ApiBody({
        schema: {
            $ref: getSchemaPath(ConsultaBinario),
        },
    })
    @ApiResponse({ status: 200, description: 'Retorna un catálogo con los productos que coincidan con la consulta' })
    @ApiResponse({ status: 400, description: 'Error en la consulta' })
    @Post('binario')
    @UseInterceptors(FileInterceptor('archivo'))
    async consultaBinario(@UploadedFile() file: Express.Multer.File, @Query() paginacion: PaginacionDto, @Body() { consulta }) {
        return await this.iaconsultasService.getRespuestaImagenBinario(file, paginacion, consulta)
    }


    @ApiOperation({ summary: "Obtener catálogo productos en base a consulta con imagen en base64 y texto" })
    @ApiResponse({ status: 200, description: 'Retorna un catálogo con los productos que coincidan con la consulta' })
    @ApiResponse({ status: 400, description: 'Error en la consulta' })
    @ApiBody({ type: ConsultaBase64Dto })
    @Post('base')
    async consultaBase64(@Body(ValidarContenidoConsultaPipe) consultaDto: ConsultaBase64Dto, @Query() paginacion: PaginacionDto) {
        return await this.iaconsultasService.getRespuestaImagenBase64(consultaDto, paginacion)
    }

}
