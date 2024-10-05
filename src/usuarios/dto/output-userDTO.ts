import { ApiProperty } from '@nestjs/swagger';
import { OutputCarroComprasDto } from 'src/carro-compras/dto/output-carro-compras.dto';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

export class OutputUserDTO {

  @ApiProperty({ example: 'New Name' })
  public name: string;

  @ApiProperty({ example: 'updateduser@gmail.com' })
  public email: string;

  @ApiProperty()
  public carrito: OutputCarroComprasDto;

  @ApiProperty()
  public pedidos: Pedido[];

  constructor(
    name: string,
    email: string,
    carrito: OutputCarroComprasDto,
    pedido: Pedido[],
  ) {
    this.name = name;
    this.email = email;
    this.carrito = carrito;
    this.pedidos = pedido;
  }
}