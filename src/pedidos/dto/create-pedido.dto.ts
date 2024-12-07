import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, ValidateIf } from 'class-validator';

export class CreatePedidoDto {
  // @ApiProperty({ example: 2, description: 'Identificador del usuario' })
  // @IsInt({ message: 'El idUsuario debe ser un número entero' })
  // idUsuario: number;
  @ApiProperty({
    example: '2024-10-12',
    description: 'Fecha de creación del pedido',
  })
  @ValidateIf((o) => o.fechaCreacion)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  fechaCreacion: Date;
  @ApiProperty({ example: 1, description: 'Identificador del medio de pago' })
  @IsInt({ message: 'El idMedioPago debe ser un número entero' })
  idMedioPago: number;
  @IsInt({ message: 'El idEstado debe ser un número entero' })
  @ApiProperty({
    example: 1,
    description: 'Identificador del estado del pedido',
  })
  idEstado: number;
  @IsInt({ message: 'El idTipoDespacho debe ser un número entero' })
  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de despacho',
  })
  idTipoDespacho: number;
  // @ApiProperty({
  //   example: 1,
  //   description: 'Identificador del carro de compra',
  // })
  // @IsInt({ message: 'El idCarro debe ser un número entero' })
  // idCarro: number;
  @ApiProperty({
    example: '2024-10-15',
    description: 'Fecha de entrega del pedido al cliente',
  })
  @ValidateIf((o) => o.fechaCreacion)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  fechaEntrega: Date;
}
