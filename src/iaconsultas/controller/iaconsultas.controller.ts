import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { FormularioFileDto } from '../dto/formulario.file.dto';
import { IaconsultasService } from '../service/iaconsultas.service';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';

@Controller('iaconsultas')
export class IaconsultasController {

    constructor(private readonly iaconsultasService: IaconsultasService) { }
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


    @ApiBody({ type: ConsultaBase64Dto })
    @Post('base')
    async consultaBase64(@Body() consultaDto: ConsultaBase64Dto) {
        return await this.iaconsultasService.getRespuestaImagenBase64(consultaDto)
    }

}
