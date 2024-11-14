import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { EstadoPedido } from '../entities/estado_pedido.entity';
import { TipoDespacho } from '../entities/tipo_despacho.entity';
import { CarroCompra } from 'src/carro-compras/entities/carro.entity';
import { Pago } from 'src/commons/entities/pagos.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  // pedientes de desarrollo cuando se creen los DTOs
  @ApiProperty()
  usuario?: Usuario; // Por id_usuario
  @ApiProperty()
  medioPago?: MedioPago; // Por id_medio_pago
  @ApiProperty()
  estadoPedido?: EstadoPedido; // Por id_estado
  @ApiProperty()
  tipoDespacho?: TipoDespacho; // Por id_tipo_despacho
  @ApiProperty()
  carro?: CarroCompra; // Por id_carro
  @ApiProperty()
  Pago?: Pago; // Por id_pedido
}
