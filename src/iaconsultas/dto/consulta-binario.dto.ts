import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ConsultaBinario {
    @ApiProperty({
        type: 'file',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    archivo: Express.Multer.File;
    @ApiProperty({ example: 'Tengo mascotas y quiero plantas aromáticas.' })
    @IsString()
    consulta: string = 'Consulta sin texto.';
}