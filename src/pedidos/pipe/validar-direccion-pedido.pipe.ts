import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import { CreatePedidoDto } from '../dto/create-pedido.dto';

/**Valida que se defina una dirección para el envío, ya sea nueva o registrada anteriormente*/
@Injectable()
export class ValidarDireccionPedidoPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const pedidoDto: CreatePedidoDto = value;
    if (!pedidoDto.direccionEnvio && pedidoDto.idxDireccion == undefined) {
      throw new BadRequestException('Se debe definir una dirección de envío, nueva o guardada.');
    }
    if (pedidoDto.idxDireccion != undefined && !pedidoDto.direccionEnvio) {
      if (pedidoDto.idxDireccion < 0) {
        throw new BadRequestException('Se debe definir un índice de dirección válido.');
      }
    }
    return value;
  }
}
