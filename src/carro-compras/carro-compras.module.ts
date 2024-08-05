import { Module } from '@nestjs/common';
import { CarroComprasService } from './carro-compras.service';
import { CarroComprasController } from './carro-compras.controller';

@Module({
  controllers: [CarroComprasController],
  providers: [CarroComprasService],
})
export class CarroComprasModule {}
