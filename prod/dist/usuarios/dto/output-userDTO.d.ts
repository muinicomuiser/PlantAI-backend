import { OutputCarroComprasDto } from 'src/carro-compras/dto/output-carro-compras.dto';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
export declare class OutputUserDTO {
  name: string;
  email: string;
  carrito: OutputCarroComprasDto;
  pedidos: Pedido[];
  constructor(
    name: string,
    email: string,
    carrito: OutputCarroComprasDto,
    pedido: Pedido[],
  );
}
