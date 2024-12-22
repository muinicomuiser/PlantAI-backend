import { ApiProperty } from "@nestjs/swagger";
import { Base64Dto } from "./base64.dto";
import { IsString } from "class-validator";

export class ConsultaBase64Dto {
    @ApiProperty({ type: Base64Dto })
    @IsString()
    base64: Base64Dto;

    @ApiProperty({ example: 'Tengo mascotas y quiero plantas aromáticas.' })
    @IsString()
    consulta: string = 'Consulta sin texto.';
}