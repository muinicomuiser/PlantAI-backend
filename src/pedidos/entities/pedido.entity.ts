import { ApiProperty } from '@nestjs/swagger';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoDespacho } from './despacho.enum';
import { estadoPedido } from './estado.enum';
import { tipoPago } from './pago.enum';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { isClassDeclaration, isClassElement, isClassLike } from 'typescript';

export class Pedido {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  idUsuario: number;
  @ApiProperty()
  @IsDate()
  fechaCreacion: Date;
  @ApiProperty()
  @IsEnum(estadoPedido)
  public estado: estadoPedido;
  @ApiProperty()
  @IsEnum(tipoDespacho)
  public tipoDespacho: tipoDespacho;
  @ApiProperty()
  @IsEnum(tipoPago)
  public tipoPago: tipoPago;
  @ApiProperty()
  public carrito: CarroCompra;
  @ApiProperty()
  @IsDate()
  public fechaEntrega: Date;
}

//agregar dirección facturación.
