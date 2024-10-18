import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from '../entities/tipo_despacho.entity';
import { tipoPago } from '../entities/pago.enum';
import { IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  public idusuario: number;

  @ApiProperty({ example: tipoDespacho.RETIRO })
  @IsEnum(tipoDespacho, { message: 'El tipo de despacho es incorrecto' })
  public tipoDespacho: tipoDespacho;

  @ApiProperty({ example: tipoPago.MERCADOPAGO })
  @IsEnum(tipoPago, { message: 'El tipo de pago es incorrecto' })
  public tipoPago: tipoPago;

  @ApiProperty({})
  @ValidateNested()
  @Type(() => CarroCompra)
  public carrito: CarroCompra;

  @ApiProperty({ example: new Date() })
  @ValidateNested()
  @Type(() => Date)
  public fechaEntrega: Date;
}
