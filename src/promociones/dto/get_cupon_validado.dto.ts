import { ApiProperty } from "@nestjs/swagger";

export class GetCuponValidadoDto {

    @ApiProperty()
    idCupon?: number;

    @ApiProperty()
    validado: boolean;

    @ApiProperty()
    codigoValidacion?: string;

}