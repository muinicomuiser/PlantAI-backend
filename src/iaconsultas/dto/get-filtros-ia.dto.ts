import { ApiProperty } from "@nestjs/swagger";
export class GetFiltrosIaDto {
    @ApiProperty()
    idEntorno?: number;

    @ApiProperty()
    petFriendly?: boolean;

    @ApiProperty()
    idToleranciaTemperatura?: number;

    @ApiProperty()
    idIluminacion?: number;

    @ApiProperty()
    idTipoRiego?: number;

    @ApiProperty()
    sizePlant?: string;
} 