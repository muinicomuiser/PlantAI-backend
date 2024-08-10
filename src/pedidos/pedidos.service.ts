import { Injectable } from '@nestjs/common';


@Injectable()
export class PedidosService {

  findAll() {
    return `Proceso de checkout y confirmación de pedidos`;
  }

}
