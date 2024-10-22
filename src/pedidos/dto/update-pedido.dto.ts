import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePedidoDto {
  @ApiProperty()
  public estado: string;

  @ApiProperty()
  public tipoDespacho: string;

  @ApiProperty()
  public tipoPago: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Date)
  public fechaEntrega: Date;
}
