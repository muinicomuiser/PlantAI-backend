import { ApiProperty } from '@nestjs/swagger';
import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Pago } from 'src/commons/entities/pagos.entity';
import { EstadoPedido } from '../entities/estado_pedido.entity';
import { TipoDespacho } from '../entities/tipo_despacho.entity';
import { GetProductoPedidoDto } from './get-producto-pedido.dto';
import { GetDireccionEnvioDto } from './get-direccion-envio.dto';

export class GetPedidoDto {
  @ApiProperty({ example: 1, description: 'Identificador del pedido' })
  id: number;
  @ApiProperty({ example: 1, description: 'Identificador del usuario' })
  idUsuario: number;
  @ApiProperty({
    example: '2021-10-12',
    description: 'Fecha de creación del pedido',
  })
  fechaCreacion: Date;
  @ApiProperty({ example: 1, description: 'Identificador del medio de pago' })
  idMedioPago: number;
  @ApiProperty({
    example: 1,
    description: 'Identificador del estado del pedido',
  })
  idEstado: number;
  @ApiProperty({
    example: 1,
    description: 'Identificador del tipo de despacho',
  })
  idTipoDespacho: number;
  @ApiProperty({ example: 1, description: 'Identificador del carro de compra' })
  idCarro: number;
  @ApiProperty({
    example: '2021-10-15',
    description: 'Fecha de entrega del pedido al cliente',
  })
  fechaEntrega: Date;

  @ApiProperty({ type: [GetProductoPedidoDto] })
  productosPedido: GetProductoPedidoDto[]

  @ApiProperty({ type: GetDireccionEnvioDto })
  direccionEnvio: GetDireccionEnvioDto;

  // pedientes de desarrollo cuando se creen los DTOs
  @ApiProperty()
  medioPago?: MedioPago; // Por id_medio_pago
  @ApiProperty()
  Pago?: Pago; // Por id_pedido
  @ApiProperty()
  estadoPedido?: EstadoPedido; // Por id_estado
  @ApiProperty()
  tipoDespacho?: TipoDespacho; // Por id_tipo_despacho

  // @ApiProperty()
  // usuario?: Usuario; // Por id_usuario
  // @ApiProperty()
  // carro?: CarroCompra; // Por id_carro

}
