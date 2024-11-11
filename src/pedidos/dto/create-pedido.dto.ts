import { Transform } from 'class-transformer';
import { IsDateString, IsInt } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  id: number;
  @IsInt()
  idUsuario: number;
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  fechaCreacion: Date;
  @IsInt()
  idMedioPago: number;
  @IsInt()
  idEstado: number;
  @IsInt()
  idTipoDespacho: number;
  @IsInt()
  idCarro: number;
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  fechaEntrega: Date;
}
