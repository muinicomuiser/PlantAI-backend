import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetCarroComprasDto } from 'src/carro-compras/dto/get-carro-compras.dto';

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
  @Type(() => GetCarroComprasDto)
  public carrito: GetCarroComprasDto;

  @ApiProperty({ example: new Date() })
  @ValidateNested()
  @Type(() => Date)
  public fechaEntrega: Date;
}
