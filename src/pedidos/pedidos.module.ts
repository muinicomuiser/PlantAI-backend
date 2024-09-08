import { Module } from '@nestjs/common';
import { PedidosController } from './controller/pedidos.controller';
import { PedidosService } from './service/pedidos.service';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
