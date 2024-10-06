import { ApiProperty } from '@nestjs/swagger';
import { tipoDespacho } from '../entities/despacho.enum';
import { estadoPedido } from '../entities/estado.enum';
import { tipoPago } from '../entities/pago.enum';
import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePedidoDto {
  @ApiProperty()
  @IsEnum(estadoPedido, { message: 'El estado del pedido es incorrecto' })
  public estado: estadoPedido;

  @ApiProperty()
  @IsEnum(tipoDespacho, { message: 'El tipo de despacho es incorrecto' })
  public tipoDespacho: tipoDespacho;

  @ApiProperty()
  @IsEnum(tipoPago, { message: 'El tipo de pago es incorrecto' })
  public tipoPago: tipoPago;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Date)
  public fechaEntrega: Date;
}
