import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ConsultaBase64Dto {
    @ApiProperty({ type: String, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII', })
    @IsString()
    @IsOptional()
    base64: string;

    @ApiProperty({ example: 'Tengo mascotas y quiero plantas aromáticas.' })
    @IsString()
    @IsOptional()
    consulta: string = 'Consulta sin texto.';
}