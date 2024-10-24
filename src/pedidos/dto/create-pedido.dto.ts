import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carros.entity';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  public idusuario: number;

  @ApiProperty()
  public tipoDespacho: string;

  @ApiProperty()
  public tipoPago: string;

  @ApiProperty({})
  @ValidateNested()
  @Type(() => CarroCompra)
  public carrito: CarroCompra;

  @ApiProperty({ example: new Date() })
  @ValidateNested()
  @Type(() => Date)
  public fechaEntrega: Date;
}
