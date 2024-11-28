import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class UpdateProductImageDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'base64' })
    base64Content?: string;
}