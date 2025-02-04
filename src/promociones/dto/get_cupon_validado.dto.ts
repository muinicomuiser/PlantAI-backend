import { ApiProperty } from "@nestjs/swagger";

export class GetCuponValidadoDto {

    @ApiProperty({
        description: 'Define si se ha validado un cupón o no'
    })
    validado: boolean;

    @ApiProperty({
        description: 'ID del cupón validado con el código',
        required: false
    })
    idCupon?: number;

    @ApiProperty({
        description: 'Código usado para validar el cupón',
        required: false
    })
    codigoValidacion?: string;

}