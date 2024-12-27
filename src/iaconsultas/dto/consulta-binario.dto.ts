import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ConsultaBinario {
    @ApiProperty({
        type: 'file',
        items: {
            type: 'string',
            format: 'binary',
        },
        required: false
    })
    @IsOptional()
    archivo?: Express.Multer.File;
    @ApiProperty({ example: 'Tengo mascotas y quiero plantas aromáticas.', required: false })
    @IsString()
    consulta?: string;
}