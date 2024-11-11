import { ApiProperty } from '@nestjs/swagger';
import { GetCarroComprasDto } from 'src/carro-compras/dto/get-carro-compras.dto';

export class OutputPedidoDto {
  @ApiProperty({ example: 1 })
  public id: number;

  @ApiProperty({ example: 1 })
  public idUsuario: number;

  @ApiProperty({ example: new Date() })
  public fechaCreacion: Date;

  @ApiProperty({})
  public estado: string;

  @ApiProperty({})
  public tipoDespacho: string;

  @ApiProperty({})
  public tipoPago: string;

  @ApiProperty({})
  public carrito: GetCarroComprasDto;

  @ApiProperty({ example: new Date() })
  public fechaEntrega: Date;

  constructor(
    idUsuario: number,
    estado: string,
    tipoDespacho: string,
    tipoPago: string,
    carrito: GetCarroComprasDto,
  ) {
    this.id = 0;
    this.idUsuario = idUsuario;
    this.fechaCreacion = new Date();
    this.estado = estado;
    this.tipoDespacho = tipoDespacho;
    this.tipoPago = tipoPago;
    this.carrito = carrito;
    this.fechaEntrega = new Date();
  }
}
