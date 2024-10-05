import { Injectable } from '@nestjs/common';
import { CarroCompra } from 'src/carro-compras/entities/carro-compra.entity';
import { tipoPago } from '../entities/pago.enum';
import { tipoDespacho } from '../entities/despacho.enum';
import { estadoPedido } from '../entities/estado.enum';
import { OutputPedidoDto } from '../dto/output-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

const PedidoSalidaEjemplo: OutputPedidoDto = new OutputPedidoDto(
  1,
  estadoPedido.PAGADO,
  tipoDespacho.RETIRO,
  tipoPago.MERCADOPAGO,
  new CarroCompra(1, 1, [], 0),
);
PedidoSalidaEjemplo.id = 1;

@Injectable()
export class PedidosService {

  create() {
    return { mensaje: 'Pedido creado' };
  }

  /**Retorna todos los pedidos */
  findAll(): OutputPedidoDto[] {
    return [PedidoSalidaEjemplo];
  }

  /**Retorna un pedido según su id */
  findOne(id: number): OutputPedidoDto {
    return PedidoSalidaEjemplo;
  }

  /**Modifica un pedido según su id */
  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return { mensaje: 'Pedido modificado' };
  }
}
