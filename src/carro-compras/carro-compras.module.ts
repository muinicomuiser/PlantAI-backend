import { Module } from '@nestjs/common';
import { CarroComprasService } from './service/carro-compras.service';
import { CarroComprasController } from './controller/carro-compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroCompra } from './entities/carro.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CarroProducto } from './entities/carro_producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarroCompra, Producto, CarroProducto, Usuario])],
  controllers: [CarroComprasController],
  providers: [CarroComprasService],
})
export class CarroComprasModule { }
