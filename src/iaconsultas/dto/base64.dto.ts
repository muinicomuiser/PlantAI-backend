import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Base64Dto {
    @ApiProperty({ type: String, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII', })
    @IsString()
    contenido: string
}