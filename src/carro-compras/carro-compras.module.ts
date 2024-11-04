import { Module } from '@nestjs/common';
import { CarroComprasService } from './service/carro-compras.service';
import { CarroComprasController } from './controller/carro-compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroCompra } from './entities/carro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarroCompra])],
  controllers: [CarroComprasController],
  providers: [CarroComprasService],
})
export class CarroComprasModule { }
