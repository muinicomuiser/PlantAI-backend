import { Module } from '@nestjs/common';
import { PedidosController } from './controller/pedidos.controller';
import { PedidosService } from './service/pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { EstadoPedido } from './entities/estado_pedido.entity';
import { TipoDespacho } from './entities/tipo_despacho.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, EstadoPedido, TipoDespacho])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
