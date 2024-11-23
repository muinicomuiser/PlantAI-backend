import { IsBooleanString, IsInt, IsNumberString, IsOptional } from "class-validator";

export class QueryCarroDto {
    @IsBooleanString()
    @IsOptional()
    activo?: boolean | undefined;

    @IsNumberString({ no_symbols: true })
    @IsOptional()
    idUsuario?: number;
}