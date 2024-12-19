import { ApiProperty } from "@nestjs/swagger";
import { IsBase64 } from "class-validator";
import { Base64Dto } from "./base64.dto";
import { Type } from "class-transformer";

export class ConsultaBase64Dto {
    @ApiProperty({ type: Base64Dto })
    base64: Base64Dto;

    @ApiProperty({ type: String, example: 'Tengo mascotas y quiero plantas aromáticas.' })
    consulta: string;
}