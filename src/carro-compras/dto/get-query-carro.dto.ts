import { IsBooleanString, IsEnum, IsInt, IsNumberString, IsOptional } from "class-validator";
import { EstadoCarro } from "./estado-carro.enum";

export class QueryCarroDto {
    @IsEnum(EstadoCarro)
    @IsOptional()
    estado?: EstadoCarro;

    @IsNumberString({ no_symbols: true })
    @IsOptional()
    idUsuario?: number;
}