import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateProductImageDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'base64' })
    base64Content: string;
}