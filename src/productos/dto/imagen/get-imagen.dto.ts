import { ApiProperty } from "@nestjs/swagger";

export class GetImagenDto {
    @ApiProperty({ example: '/estaticos/nombre-imagen.jpg' })
    ruta: string
}