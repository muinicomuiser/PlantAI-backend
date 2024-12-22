import { Body, Controller, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FormularioFileDto } from '../dto/formulario.file.dto';
import { IaconsultasService } from '../service/iaconsultas.service';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';
import { ValidarContenidoConsultaPipe } from '../pipe/validar-contenido-consulta.pipe';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';

@ApiTags('IAConsultas')
@Controller('iaconsultas')
export class IaconsultasController {

    constructor(private readonly iaconsultasService: IaconsultasService) { }

    @ApiOperation({ summary: "Obtener catálogo productos en base a consulta con imagen en binario y texto" })

    @ApiConsumes('multipart/form-data')
    @ApiExtraModels(
        FormularioFileDto,
    )
    @ApiBody({
        schema: {
            $ref: getSchemaPath(FormularioFileDto),
        },
    })
    @Post('binario')
    @UseInterceptors(FileInterceptor('archivo'))
    async consultaBinario(@UploadedFile() file: Express.Multer.File) {
        return await this.iaconsultasService.getRespuestaImagenBinario(file)
    }


    @ApiOperation({ summary: "Obtener catálogo productos en base a consulta con imagen en base64 y texto" })
    @ApiBody({ type: ConsultaBase64Dto })
    @Post('base')
    async consultaBase64(@Body(ValidarContenidoConsultaPipe) consultaDto: ConsultaBase64Dto, @Query() paginacion: PaginacionDto) {
        return await this.iaconsultasService.getRespuestaImagenBase64(consultaDto, paginacion)
    }

}
