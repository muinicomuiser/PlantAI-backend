import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Base64Dto {
    @ApiProperty({ type: String, example: 'base64', })
    @IsString()
    contenido: string
}