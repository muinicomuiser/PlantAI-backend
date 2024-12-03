import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { FormularioFileDto } from '../dto/formulario.file.dto';
import { IaconsultasService } from '../service/iaconsultas.service';

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
        return await this.iaconsultasService.getRespuestaImagen(file)
    }

    @Post('base')
    consultaBase64() { }

}
