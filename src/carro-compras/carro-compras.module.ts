import { Module } from '@nestjs/common';
import { CarroComprasService } from './service/carro-compras.service';
import { CarroComprasController } from './controller/carro-compras.controller';

@Module({
  controllers: [CarroComprasController],
  providers: [CarroComprasService],
})
export class CarroComprasModule {}
