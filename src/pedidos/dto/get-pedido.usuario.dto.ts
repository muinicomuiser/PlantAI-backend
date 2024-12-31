import { ApiProperty } from '@nestjs/swagger';
import { GetDireccionEnvioDto } from './get-direccion-envio.dto';
import { GetProductoPedidoDto } from './get-producto-pedido.dto';

export class GetPedidoUsuarioDto {

  @ApiProperty({ example: 1, description: 'Identificador del pedido' })
  id: number;

  @ApiProperty({ example: 1, description: 'Identificador del usuario' })
  idUsuario: number;

  @ApiProperty({
    example: '2021-10-12',
    description: 'Fecha de creación del pedido',
  })
  fechaCreacion: Date;

  @ApiProperty({ example: "Webpay", description: 'Nombre del medio de pago' })
  nombreMedioPago: string;

  @ApiProperty({
    example: '2021-10-15',
    description: 'Fecha de entrega del pedido al cliente',
  })
  fechaEntrega: Date;

  @ApiProperty({ example: 'Entregado' })
  nombreEstadoPedido: string; // Por id_estado

  @ApiProperty({ example: 'Retiro' })
  nombreTipoDespacho: string; // Por id_tipo_despacho

  @ApiProperty({ example: 'Juanito' })
  receptor: string;

  @ApiProperty({ type: GetDireccionEnvioDto })
  direccionEnvio: GetDireccionEnvioDto;

  @ApiProperty({ type: [GetProductoPedidoDto] })
  productosPedido: GetProductoPedidoDto[]


  // @ApiProperty()
  // usuario?: Usuario; // Por id_usuario
  // @ApiProperty()
  // carro?: CarroCompra; // Por id_carro

}
